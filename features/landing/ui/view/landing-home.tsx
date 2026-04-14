import { PageContainer } from "@/components/page/page-container";
import { PageHeader } from "@/components/ui/page-header";

const featuredProducts = [
  {
    name: "Produto Destaque 01",
    category: "Linha Premium",
    description:
      "Peca principal da sua loja com acabamento forte, visual marcante e otima percepcao de valor.",
    price: "R$ 89,90",
  },
  {
    name: "Produto Destaque 02",
    category: "Colecao Performance",
    description:
      "Modelo pensado para quem busca estilo, presenca e um produto que chama atencao logo de cara.",
    price: "R$ 109,90",
  },
  {
    name: "Produto Destaque 03",
    category: "Edicao Especial",
    description:
      "Ideal para destacar variedade no catalogo e mostrar que sua loja trabalha com opcoes exclusivas.",
    price: "R$ 69,90",
  },
];

const highlights = [
  "Visual forte para valorizar seus produtos",
  "Apresentacao clara para vender pelo Instagram ou WhatsApp",
  "Estrutura pronta para trocar textos, links e precos",
];

const socialLinks = [
  { title: "Instagram", detail: "@sualoja", href: "https://instagram.com" },
  { title: "WhatsApp", detail: "(00) 00000-0000", href: "https://wa.me/5500000000000" },
  { title: "Catalogo", detail: "Ver colecao completa", href: "#produtos" },
];

export function LandingHome() {
  return (
    <div className="hero-grid relative flex min-h-screen w-full flex-col overflow-hidden bg-[var(--hero-background)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.45),_transparent_38%)] dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_32%)]" />

      <PageContainer className="m-2 overflow-hidden p-0 sm:m-3">
        <PageHeader
          title="IFJ"
          highlightText="Caneleiras Personalizadas"
          subtitle=""
        >
          <nav className="flex flex-wrap items-center justify-end gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
            <a
              href="#inicio"
              className="rounded-full border border-border bg-background/70 px-4 py-2 transition hover:border-[var(--tone-primary)] hover:text-foreground"
            >
              Inicio
            </a>
            <a
              href="#redes"
              className="rounded-full border border-border bg-background/70 px-4 py-2 transition hover:border-[var(--tone-primary)] hover:text-foreground"
            >
              Redes
            </a>
            <a
              href="#contato"
              className="rounded-full border border-border bg-background/70 px-4 py-2 transition hover:border-[var(--tone-primary)] hover:text-foreground"
            >
              Contato
            </a>
          </nav>
        </PageHeader>

        <div className="flex flex-1 flex-col overflow-y-auto">
          <section
            id="inicio"
            className="grid gap-6 border-b border-border/70 px-4 py-5 sm:px-6 sm:py-6 lg:grid-cols-[1.15fr_0.85fr]"
          >
            <div className="surface-soft relative overflow-hidden p-6 sm:p-8">
              <div className="pointer-events-none absolute inset-0 opacity-70 dark:opacity-100">
                <div className="absolute inset-x-[-12%] top-[-20%] h-56 rounded-full bg-[color-mix(in_oklab,var(--tone-primary)_26%,transparent)] blur-3xl" />
              </div>

              <div className="relative space-y-6">
                <div className="inline-flex items-center rounded-full border border-border bg-card/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground sm:text-xs">
                  Colecao em destaque
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--tone-primary)]">
                    Produtos para apresentar sua loja com presenca
                  </p>
                  <h2 className="max-w-3xl text-4xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl">
                    Seu catalogo com cara de marca forte.
                  </h2>
                  <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                    Uma landing pensada para destacar seus produtos, conduzir o
                    cliente para suas redes e facilitar o contato direto para venda.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#produtos"
                    className="inline-flex items-center justify-center rounded-full bg-[var(--tone-primary)] px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-foreground)] transition hover:brightness-95"
                  >
                    Ver produtos
                  </a>
                  <a
                    href="#contato"
                    className="inline-flex items-center justify-center rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] transition hover:border-[var(--tone-primary)]"
                  >
                    Falar agora
                  </a>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  {highlights.map((item) => (
                    <div key={item} className="surface-soft p-4 text-sm leading-6 text-muted-foreground">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="surface-soft p-4 sm:p-5">
              <div className="flex h-full flex-col rounded-4xl border border-border/70 bg-card p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] dark:shadow-none">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
                  <span>Lancamento</span>
                  <span>Disponivel</span>
                </div>

                <div className="mt-5 flex flex-1 flex-col justify-between rounded-4xl border border-border/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0.3))] p-6 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--tone-primary)]">
                      Produto principal
                    </p>
                    <h3 className="text-4xl font-black uppercase leading-none tracking-[-0.05em] sm:text-5xl">
                      Destaque da semana
                    </h3>
                    <p className="max-w-md text-sm leading-7 text-muted-foreground">
                      Use este bloco para colocar o item mais importante da sua loja
                      com foto, beneficio principal e uma chamada de compra direta.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
                        A partir de
                      </p>
                      <p className="mt-2 text-3xl font-black text-[var(--tone-primary)]">
                        R$ 89,90
                      </p>
                    </div>

                    <div className="rounded-full border border-border bg-background/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
                      Frete sob consulta
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {["Qualidade", "Presenca", "Venda direta"].map((tag) => (
                    <div
                      key={tag}
                      className="rounded-3xl border border-border bg-background/70 px-3 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-xs"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="produtos" className="border-b border-border/70 px-4 py-5 sm:px-6 sm:py-6">
            <div className="flex flex-col gap-3 sm:gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--tone-primary)]">
                Produtos
              </p>
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <h2 className="max-w-3xl text-3xl font-black uppercase leading-none tracking-[-0.05em] sm:text-5xl">
                  Escolha os destaques da sua vitrine.
                </h2>
                <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                  Estes cards ja estao prontos para receber nome, descricao, preco
                  e link dos seus produtos reais.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-3">
              {featuredProducts.map((product, index) => (
                <article key={product.name} className="surface-soft p-4">
                  <div className="flex h-full flex-col rounded-4xl border border-border/70 bg-card p-5 transition hover:-translate-y-1 hover:border-[var(--tone-primary)]/50">
                    <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
                      <span>{product.category}</span>
                      <span className="text-[var(--tone-primary)]">0{index + 1}</span>
                    </div>

                    <div className="mt-8 flex flex-1 flex-col justify-between gap-8">
                      <div>
                        <h3 className="max-w-xs text-3xl font-black uppercase leading-none tracking-[-0.05em]">
                          {product.name}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-muted-foreground">
                          {product.description}
                        </p>
                      </div>

                      <p className="text-2xl font-black text-[var(--tone-primary)]">
                        {product.price}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="redes" className="border-b border-border/70 px-4 py-5 sm:px-6 sm:py-6">
            <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
              <div className="surface-soft p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--tone-primary)]">
                  Redes
                </p>
                <h2 className="mt-4 text-3xl font-black uppercase leading-none tracking-[-0.05em] sm:text-5xl">
                  Leve o cliente para onde voce vende.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                  Aqui entram seus links principais. Se sua venda acontece pelo
                  Instagram, WhatsApp ou marketplace, essa secao ja guia o visitante.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="surface-soft flex min-h-44 flex-col justify-between p-5 transition hover:border-[var(--tone-primary)]/50 hover:-translate-y-1"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
                      {item.title}
                    </p>
                    <p className="text-3xl font-black uppercase leading-none tracking-[-0.05em]">
                      {item.detail}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section id="contato" className="px-4 py-5 sm:px-6 sm:py-6">
            <div className="surface-soft overflow-hidden p-0">
              <div className="grid gap-5 p-6 sm:p-8 xl:grid-cols-[1.08fr_0.92fr]">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--tone-primary)]">
                    Contato
                  </p>
                  <h2 className="mt-4 max-w-3xl text-4xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl">
                    Sua proxima venda pode comecar aqui.
                  </h2>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                    Troque este texto por uma frase curta sobre atendimento, prazo,
                    personalizacao ou envio. A ideia e fechar a landing com uma
                    chamada direta para acao.
                  </p>
                </div>

                <div className="rounded-4xl border border-border/70 bg-card p-6">
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <p>
                      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.2em] sm:text-xs">
                        WhatsApp
                      </span>
                      (00) 00000-0000
                    </p>
                    <p>
                      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.2em] sm:text-xs">
                        Instagram
                      </span>
                      @sualoja
                    </p>
                    <p>
                      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.2em] sm:text-xs">
                        E-mail
                      </span>
                      contato@sualoja.com
                    </p>
                  </div>

                  <a
                    href="https://wa.me/5500000000000"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[var(--tone-primary)] px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-foreground)] transition hover:brightness-95"
                  >
                    Chamar no WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </PageContainer>
    </div>
  );
}
