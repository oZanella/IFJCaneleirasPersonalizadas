import { AdminProductsPanel } from '@/features/landing/ui/components/admin-products-panel';
import { ProductCard } from '@/features/landing/ui/components/product-card';
import { RevealOnScroll } from '@/features/landing/ui/components/reveal-on-scroll';
import { SectionTitle } from '@/features/landing/ui/components/section-title';
import type { ProductCollection } from '../../data/landing-content';

type ProductsSectionProps = {
  products: ProductCollection;
  isAdmin: boolean;
};

export function ProductsSection({ products, isAdmin }: ProductsSectionProps) {
  return (
    <section id="produtos" className="bg-[#101010] px-5 py-20 sm:px-8 lg:px-16">
      <div className="mx-auto ">
        <RevealOnScroll>
          <div className="mb-16">
            <SectionTitle
              eyebrow="Catálogo"
              title="Equipamentos de Alta Performance"
              description="O cuidado com cada detalhe é o que define o resultado. Comece pelas suas caneleiras."
            />
          </div>
        </RevealOnScroll>

        {isAdmin ? <AdminProductsPanel products={products} /> : null}

        <div className="mb-20">
          <div className="mb-8 flex items-center gap-4">
            <h3 className="text-xl font-bold uppercase tracking-widest text-white sm:text-2xl">
              Caneleiras Personalizáveis
            </h3>
            <div className="h-px flex-1 bg-linear-to-r from-zinc-500 to-transparent opacity-30" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.customProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-8 flex items-center gap-4">
            <h3 className="text-xl font-bold uppercase tracking-widest text-zinc-400 sm:text-2xl">
              Acessórios Esportivos
            </h3>
            <div className="h-px flex-1 bg-linear-to-r from-zinc-700 to-transparent opacity-20" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.storeProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
