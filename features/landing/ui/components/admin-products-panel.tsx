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

const installmentOptions = Array.from({ length: 12 }, (_, index) => ({
  value: String(index + 1),
  label: `${index + 1}x`,
}));

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
    price: String(product.price),
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
    <div className="relative mb-16 rounded-[2rem] border border-emerald-400/20 bg-emerald-400/8 p-5 sm:p-7">
      {toastMessage ? (
        <div className="fixed bottom-5 left-1/2 z-80 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-emerald-300/20 bg-emerald-400 px-4 py-3 text-center text-sm font-semibold text-black shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
          {toastMessage}
        </div>
      ) : null}

      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300/80">
            Painel administrativo
          </p>
          <h3 className="mt-3 text-2xl font-black uppercase tracking-[-0.05em] text-white">
            Gerenciar catálogo
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
            Aqui o administrador pode adicionar, editar ou remover produtos sem
            preencher campos técnicos.
          </p>
        </div>
      </div>

      <div className="grid items-stretch gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <form
          className="flex h-full min-h-205 flex-1 flex-col rounded-[1.75rem] border border-white/10 bg-black/25 p-5"
          onSubmit={handleSubmit}
        >
          <div className="mb-5 flex items-center justify-between gap-4">
            <h4 className="text-lg font-bold uppercase tracking-[0.12em] text-white">
              {editingId ? 'Editar produto' : 'Novo produto'}
            </h4>
            {editingId ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditingId(null);
                  setDraft({ ...emptyDraft });
                  setInstallmentCount('');
                }}
              >
                Cancelar edição
              </Button>
            ) : null}
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-12">
            <Field label="Seção" required className="xl:col-span-4">
              <CustomSelect
                value={draft.section}
                options={sectionOptions}
                onChange={(value) =>
                  updateField('section', value as ProductSection)
                }
              />
            </Field>
            <Field label="Nome" required className="xl:col-span-8">
              <input
                value={draft.name}
                onChange={(event) => updateField('name', event.target.value)}
                className="admin-input"
                required
              />
            </Field>
            <Field label="Categoria" className="xl:col-span-4">
              <input
                value={draft.category}
                onChange={(event) =>
                  updateField('category', event.target.value)
                }
                className="admin-input"
                placeholder="Opcional"
              />
            </Field>
            <Field label="Preço" required className="xl:col-span-4">
              <div className="admin-input flex items-center gap-3">
                <span className="shrink-0 text-sm font-semibold text-white/65">
                  R$
                </span>
                <input
                  inputMode="numeric"
                  value={draft.price}
                  onChange={(event) => {
                    const nextPrice = formatCurrencyInput(event.target.value);
                    updateField('price', nextPrice);
                  }}
                  className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none"
                  placeholder="0,00"
                  required
                />
              </div>
            </Field>
            <Field label="Parcelar em" className="xl:col-span-4">
              <CustomSelect
                value={installmentCount}
                placeholder="Sem cálculo automático"
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
            <Field label="Valor da parcela" className="xl:col-span-6">
              <div className="admin-input flex items-center gap-3">
                <span className="shrink-0 text-sm font-semibold text-white/65">
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
                  className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none"
                  placeholder="0,00"
                  disabled={!installmentCount}
                />
              </div>
              {installmentCount ? (
                <p className="mt-2 text-xs text-white/55">
                  {buildInstallmentTextWithValue(
                    draft.price,
                    installmentCount,
                    draft.installmentValue,
                  ) || `ou ${installmentCount}x de R$ 0,00`}
                </p>
              ) : (
                <p className="mt-2 text-xs text-white/45">
                  Escolha primeiro em quantas parcelas dividir
                </p>
              )}
            </Field>
            <Field label="Imagem" className="xl:col-span-6">
              <div className="space-y-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelection}
                />
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    type="button"
                    variant="outline"
                    className="admin-input h-auto w-full cursor-pointer justify-between rounded-2xl px-4 py-3 normal-case tracking-normal"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    {isUploading
                      ? 'Enviando imagem...'
                      : draft.image
                        ? 'Imagem escolhida'
                        : 'Escolher imagem'}
                  </Button>
                </div>
              </div>
            </Field>
            <Field label="Informação adicional" className="xl:col-span-6">
              <input
                value={draft.textImage ?? ''}
                onChange={(event) =>
                  updateField('textImage', event.target.value)
                }
                className="admin-input"
                placeholder="Consultar cores"
              />
            </Field>
            <Field label="Exclusividade" className="xl:col-span-6">
              <input
                value={draft.highlight ?? ''}
                onChange={(event) =>
                  updateField('highlight', event.target.value)
                }
                className="admin-input"
                placeholder="Exclusividade"
              />
            </Field>
          </div>

          <div className="mt-4 flex flex-1 flex-col">
            <Field label="Descrição do produto" className="flex flex-1 flex-col">
              <textarea
                value={draft.description}
                onChange={(event) =>
                  updateField('description', event.target.value)
                }
                className="admin-input min-h-36 h-full w-full flex-1 resize-none"
              />
            </Field>
          </div>

          <div className="mt-4 min-h-6">
            {error ? <p className="text-sm text-red-300">{error}</p> : null}
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:mt-auto sm:flex-row">
            <Button
              type="submit"
              className="min-w-60 cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? 'Salvando...'
                : editingId
                  ? 'Salvar alterações'
                  : 'Adicionar produto'}
            </Button>
          </div>
        </form>

        <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-5">
          <h4 className="mb-5 text-lg font-bold uppercase tracking-[0.12em] text-white">
            Produtos cadastrados
          </h4>
          <div className="space-y-3">
            {entries.map(({ product, section }) => (
              <div
                key={product.id}
                className="rounded-[1.4rem] border border-white/8 bg-white/4 p-4"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/80">
                      {getSectionLabel(section)}
                    </p>
                    <h5 className="mt-2 text-lg font-semibold text-white">
                      {product.name}
                    </h5>
                    <p className="mt-1 text-sm text-white/55">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => {
                        setEditingId(product.id);
                        setDraft(buildDraft(product, section));
                        setInstallmentCount('');
                        setError('');
                        setToastMessage('');
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="cursor-pointer"
                      onClick={() => handleDelete(product.id)}
                      disabled={isSubmitting}
                    >
                      Remover
                    </Button>
                  </div>
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
    <div className={className ?? 'block'}>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
        {label}
        {required ? <span className="ml-1 text-emerald-300">*</span> : null}
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
        className="admin-input flex cursor-pointer items-center justify-between"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className={selectedOption ? 'text-white' : 'text-white/45'}>
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown
          size={18}
          className={`transition ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen ? (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#171717] shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className="flex w-full cursor-pointer items-center px-4 py-3 text-left text-sm text-white transition hover:bg-white/8"
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
