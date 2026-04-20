import { products } from '@/features/landing/data/landing-content';
import { ProductCard } from '@/features/landing/ui/components/product-card';
import { RevealOnScroll } from '@/features/landing/ui/components/reveal-on-scroll';
import { SectionTitle } from '@/features/landing/ui/components/section-title';

export function ProductsSection() {
  return (
    <section id="produtos" className="bg-[#101010] px-5 py-16 sm:px-8 lg:px-12">
      <div className="w-full">
        <RevealOnScroll>
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle
              eyebrow="Produtos"
              title="Escolha o modelo ideal para personalizar"
              description="Desca a pagina e veja os produtos aparecendo aos poucos, com destaque para os valores e para o estilo de cada opcao."
            />
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
