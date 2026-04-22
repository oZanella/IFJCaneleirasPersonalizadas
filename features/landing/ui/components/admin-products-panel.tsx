/* eslint-disable @next/next/no-img-element */
'use client';

import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import type {
  Product,
  ProductCollection,
  ProductSection,
} from '@/features/landing/data/landing-content';

type AdminProductsPanelProps = {
  products: ProductCollection;
};

type ProductDraft = {
  section: ProductSection;
  name: string;
  category: string;
  price: string;
  installmentValue: string;
  description: string;
  highlight: string;
  image: string;
  textImage: string;
};

const emptyDraft: ProductDraft = {
  section: 'customProducts',
  name: '',
  category: '',
  price: '',
  installmentValue: '',
  description: '',
  highlight: '',
  image: '',
  textImage: '',
};

const sectionOptions: Array<{ value: ProductSection; label: string }> = [
  { value: 'customProducts', label: 'Caneleiras personalizáveis' },
  { value: 'storeProducts', label: 'Acessórios esportivos' },
];

const installmentOptions = [
  { value: '', label: 'Sem parcelas' },
  ...Array.from({ length: 12 }, (_, index) => ({
    value: String(index + 1),
    label: `${index + 1}x`,
  })),
];

function getSectionLabel(section: ProductSection) {
  return section === 'customProducts'
    ? 'Caneleiras personalizáveis'
    : 'Acessórios esportivos';
}

function buildDraft(
  product?: Product,
  section: ProductSection = 'customProducts',
): ProductDraft {
  if (!product) {
    return { ...emptyDraft, section };
  }

  const installmentMatch = product.installment?.match(
    /ou\s+(\d+)x?\s+de\s+R\$\s*([\d.,]+)/i,
  );

  return {
    section,
    name: product.name,
    category: product.category ?? '',
    price: formatCurrencyInput(String(Math.round(product.price * 100))),
    installmentValue: installmentMatch?.[2] ?? '',
    description: product.description,
    highlight: product.highlight ?? '',
    image: product.image ?? '',
    textImage: product.textImage ?? '',
  };
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}

function buildInstallmentTextWithValue(
  priceValue: string,
  timesValue: string,
  customInstallmentValue: string,
) {
  const price = parseCurrencyInput(priceValue);
  const times = Number(timesValue);

  if (!times) {
    return '';
  }

  const installmentValue = customInstallmentValue
    ? parseCurrencyInput(customInstallmentValue)
    : price / times;

  if (!installmentValue) {
    return '';
  }

  return `ou ${times}x de ${formatPrice(installmentValue)}`;
}

function getDefaultInstallmentValue(priceValue: string, timesValue: string) {
  const price = parseCurrencyInput(priceValue);
  const times = Number(timesValue);

  if (!price || !times) {
    return '';
  }

  return formatCurrencyInput(String(Math.round((price / times) * 100)));
}

function formatCurrencyInput(value: string) {
  const digits = value.replace(/\D/g, '');

  if (!digits) {
    return '';
  }

  const amount = Number(digits) / 100;

  return amount.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function parseCurrencyInput(value: string) {
  if (!value) {
    return 0;
  }

  return Number(value.replace(/\./g, '').replace(',', '.'));
}

export function AdminProductsPanel({ products }: AdminProductsPanelProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [draft, setDraft] = useState<ProductDraft>({ ...emptyDraft });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [installmentCount, setInstallmentCount] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const entries = [
    ...products.customProducts.map((product) => ({
      product,
      section: 'customProducts' as const,
    })),
    ...products.storeProducts.map((product) => ({
      product,
      section: 'storeProducts' as const,
    })),
  ];

  function updateField<Key extends keyof ProductDraft>(
    field: Key,
    value: ProductDraft[Key],
  ) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage('');
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    setToastMessage('');

    const method = editingId ? 'PATCH' : 'POST';
    const endpoint = editingId
      ? `/api/admin/products/${editingId}`
      : '/api/admin/products';
    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        section: draft.section,
        name: draft.name,
        category: draft.category,
        installment: buildInstallmentTextWithValue(
          draft.price,
          installmentCount,
          draft.installmentValue,
        ),
        description: draft.description,
        highlight: draft.highlight,
        image: draft.image,
        textImage: draft.textImage,
        price: parseCurrencyInput(draft.price),
      }),
    });

    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(payload.error ?? 'Não foi possível salvar o produto.');
      setIsSubmitting(false);
      return;
    }

    setToastMessage(
      editingId
        ? 'Produto atualizado com sucesso.'
        : 'Produto criado com sucesso.',
    );
    setDraft({ ...emptyDraft });
    setEditingId(null);
    setInstallmentCount('');
    setIsSubmitting(false);
    router.refresh();
  }

  async function handleImageSelection(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setIsUploading(true);
    setError('');
    setToastMessage('');

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    });

    const payload = (await response.json()) as {
      error?: string;
      imagePath?: string;
    };

    if (!response.ok || !payload.imagePath) {
      setError(payload.error ?? 'Não foi possível enviar a imagem.');
      setIsUploading(false);
      return;
    }

    updateField('image', payload.imagePath);
    setIsUploading(false);
    event.target.value = '';
  }

  async function handleDelete(id: string) {
    setIsSubmitting(true);
    setError('');
    setToastMessage('');

    const response = await fetch(`/api/admin/products/${id}`, {
      method: 'DELETE',
    });

    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(payload.error ?? 'Não foi possível remover o produto.');
      setIsSubmitting(false);
      return;
    }

    if (editingId === id) {
      setDraft({ ...emptyDraft });
      setEditingId(null);
      setInstallmentCount('');
    }

    setToastMessage('Produto removido com sucesso');
    setIsSubmitting(false);
    router.refresh();
  }

  return (
    <div className="relative mb-12 overflow-hidden rounded-[2.5rem] border border-emerald-500/20 bg-[#0d0d0d] p-4 shadow-2xl sm:p-7">
      {/* Background decoration */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-[80px]" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-[80px]" />

      {toastMessage ? (
        <div className="fixed bottom-8 left-1/2 z-80 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 rounded-2xl border border-emerald-400/20 bg-emerald-500 px-5 py-4 text-center text-sm font-bold text-black shadow-[0_25px_60px_rgba(0,0,0,0.4)]">
          {toastMessage}
        </div>
      ) : null}

      <div className="relative mb-8 border-b border-white/5 pb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          </div>
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-emerald-400/70">
            Portal Administrativo
          </p>
        </div>
        <h3 className="mt-3 text-2xl font-black uppercase tracking-[-0.03em] text-white sm:text-3xl">
          Gestão de Catálogo
        </h3>
        <p className="mt-2 max-w-2xl text-[0.8rem] leading-6 text-white/50">
          Adicione novos produtos ou edite os existentes.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        <form
          className="flex flex-col gap-6 rounded-[2rem] border border-emerald-500/15 bg-white/3 p-5 sm:p-7"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center justify-between">
            <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              {editingId ? 'Editar Detalhes' : 'Novo Produto'}
            </h4>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Seção do Catálogo" required>
              <CustomSelect
                value={draft.section}
                options={sectionOptions}
                onChange={(value) =>
                  updateField('section', value as ProductSection)
                }
              />
            </Field>

            <Field label="Nome do Produto" required>
              <input
                value={draft.name}
                onChange={(event) => updateField('name', event.target.value)}
                className="admin-input-revised"
                required
              />
            </Field>

            <Field label="Preço (BRL)" required>
              <div className="admin-input-group">
                <span className="text-xs font-bold text-white/30">R$</span>
                <input
                  inputMode="numeric"
                  value={draft.price}
                  onChange={(event) => {
                    const nextPrice = formatCurrencyInput(event.target.value);
                    updateField('price', nextPrice);
                    if (installmentCount) {
                      updateField(
                        'installmentValue',
                        getDefaultInstallmentValue(nextPrice, installmentCount),
                      );
                    }
                  }}
                  className="w-full bg-transparent text-sm text-white outline-none"
                  placeholder="0,00"
                  required
                />
              </div>
            </Field>

            <Field label="Categoria Exibida">
              <input
                value={draft.category}
                onChange={(event) =>
                  updateField('category', event.target.value)
                }
                className="admin-input-revised"
                placeholder="Ex: Profissional"
              />
            </Field>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field label="Quantidade de parcelas">
                <CustomSelect
                  value={installmentCount}
                  placeholder="Selecione"
                  options={installmentOptions}
                  onChange={(nextValue) => {
                    setInstallmentCount(nextValue);
                    updateField(
                      'installmentValue',
                      nextValue
                        ? getDefaultInstallmentValue(draft.price, nextValue)
                        : '',
                    );
                  }}
                />
              </Field>
              <Field label="Valor da parcela">
                <div className="admin-input-group">
                  <span className="text-[0.6rem] font-bold text-white/30">
                    R$
                  </span>
                  <input
                    inputMode="numeric"
                    value={draft.installmentValue}
                    onChange={(event) =>
                      updateField(
                        'installmentValue',
                        formatCurrencyInput(event.target.value),
                      )
                    }
                    className="w-full bg-transparent text-sm text-white outline-none"
                    placeholder="0,00"
                    disabled={!installmentCount}
                  />
                </div>
              </Field>
            </div>

            <Field label="Imagem do Produto">
              <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelection}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="admin-button-secondary flex-1 cursor-pointer"
                >
                  {isUploading
                    ? 'Enviando...'
                    : draft.image
                      ? 'Trocar Foto'
                      : 'Subir Imagem'}
                </button>
                {draft.image && (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 p-1">
                    <img
                      src={draft.image}
                      alt="Preview"
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>
            </Field>

            <Field label="Selo de Destaque">
              <input
                value={draft.highlight ?? ''}
                onChange={(event) =>
                  updateField('highlight', event.target.value)
                }
                className="admin-input-revised"
                placeholder="Ex: Lançamento"
              />
            </Field>

            <Field label="Texto da Imagem">
              <input
                value={draft.textImage ?? ''}
                onChange={(event) =>
                  updateField('textImage', event.target.value)
                }
                className="admin-input-revised"
                placeholder="Ex: Pronta entrega"
              />
            </Field>

            <div className="sm:col-span-2">
              <Field label="Descrição Completa">
                <textarea
                  value={draft.description}
                  onChange={(event) =>
                    updateField('description', event.target.value)
                  }
                  className="admin-input-revised h-auto! min-h-35 !py-4 resize-none"
                />
              </Field>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center justify-end gap-3 border-t border-white/5 pt-6 sm:flex-row sm:gap-4">
            {error && (
              <p className="mb-2 text-xs font-bold text-red-400 sm:mb-0 sm:mr-auto">
                {error}
              </p>
            )}

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setDraft({ ...emptyDraft });
                  setInstallmentCount('');
                }}
                className="w-full cursor-pointer rounded-xl border border-red-500/10 bg-red-500/5 px-6 py-3 text-[0.65rem] font-bold uppercase tracking-widest text-red-400/60 transition hover:bg-red-500/10 hover:text-red-400 sm:w-auto"
              >
                Descartar Mudanças
              </button>
            )}

            <Button
              type="submit"
              className={`w-full cursor-pointer shadow-lg shadow-emerald-500/10 sm:min-w-[180px] sm:w-auto ${isSubmitting ? 'opacity-50' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? 'Salvando...'
                : editingId
                  ? 'Atualizar Produto'
                  : 'Publicar'}
            </Button>
          </div>
        </form>

        <div className="flex flex-col gap-8 rounded-[2rem] border border-emerald-500/15 bg-white/3 p-5 sm:p-7">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-6 w-1 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">
                Catálogo Ativo
              </h4>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[0.65rem] font-bold text-emerald-400">
              {entries.length} itens publicados
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {entries.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 py-20 text-center">
                <p className="text-sm text-white/30">
                  Nenhum produto cadastrado.
                </p>
              </div>
            ) : null}
            {entries.map(({ product, section }) => (
              <div
                key={product.id}
                className={`group flex flex-col justify-between rounded-2xl border border-emerald-500/15 bg-white/3 p-3.5 transition-all hover:bg-white/6 ${editingId === product.id ? 'ring-2 ring-emerald-400/50' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 p-1 overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-[0.5rem] font-black uppercase text-white/20 text-center">
                        -
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col truncate">
                    <span className="text-[0.55rem] font-bold uppercase tracking-widest text-emerald-400/60">
                      {getSectionLabel(section).split(' ')[0]}
                    </span>
                    <h5 className="mt-0.5 truncate text-sm font-bold text-white/90 group-hover:text-white">
                      {product.name}
                    </h5>
                    <p className="mt-1 text-[0.8rem] font-black text-white/40">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(product.id);
                      setDraft(buildDraft(product, section));
                      setInstallmentCount('');
                      setError('');
                      setToastMessage('');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex-1 cursor-pointer rounded-xl bg-white/5 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-widest text-white/50 transition hover:bg-white/10 hover:text-white"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(product.id)}
                    disabled={isSubmitting}
                    className="cursor-pointer rounded-xl border border-red-500/10 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-widest text-red-500/40 transition hover:bg-red-500/10 hover:text-red-500"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
};

function Field({ label, required = false, className, children }: FieldProps) {
  return (
    <div className={className ?? 'flex flex-col'}>
      <span className="mb-2.5 block text-[0.65rem] font-black uppercase tracking-[0.25em] text-white/30">
        {label}
        {required ? <span className="ml-1 text-emerald-400">★</span> : null}
      </span>
      {children}
    </div>
  );
}

type CustomSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
};

function CustomSelect({
  value,
  onChange,
  options,
  placeholder = 'Selecione',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        ref={buttonRef}
        type="button"
        className="admin-input-revised flex cursor-pointer items-center justify-between"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span
          className={`text-sm ${selectedOption ? 'font-bold text-white' : 'text-white/30'}`}
        >
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen ? (
        <div className="custom-scrollbar absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-2xl border border-white/5 bg-[#1a1a1a] p-1.5 shadow-2xl backdrop-blur-xl">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`flex w-full cursor-pointer items-center rounded-xl px-4 py-3 text-left text-xs font-bold uppercase tracking-wider transition-all ${value === option.value ? 'bg-emerald-500 text-black' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
              onMouseDown={(event) => {
                event.preventDefault();
              }}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
                buttonRef.current?.blur();
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
