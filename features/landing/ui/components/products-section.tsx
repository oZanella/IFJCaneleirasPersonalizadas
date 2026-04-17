import { products } from "@/features/landing/data/landing-content";
import { ProductCard } from "@/features/landing/ui/components/product-card";
import { RevealOnScroll } from "@/features/landing/ui/components/reveal-on-scroll";
import { SectionTitle } from "@/features/landing/ui/components/section-title";

export function ProductsSection() {
  return (
    <section id="produtos" className="bg-[#101010] px-5 py-16 sm:px-8 lg:px-12">
      <div className="w-full">
        <RevealOnScroll>
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle
              eyebrow="Produtos"
              title="Os produtos entram em cena conforme a rolagem"
              description="A grade foi pensada para ocupar a largura da tela com mais respiro, mais impacto e melhor leitura no desktop e no mobile."
            />
            <p className="max-w-xl text-sm leading-7 text-white/58 sm:text-base">
              Aqui entram apenas os valores e os destaques de cada item, sem configurador.
              A ideia e apresentar o catalogo com mais cara de marca.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
