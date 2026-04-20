import { ProductCard } from '@/features/landing/ui/components/product-card';
import { RevealOnScroll } from '@/features/landing/ui/components/reveal-on-scroll';
import { SectionTitle } from '@/features/landing/ui/components/section-title';
import { customProducts, storeProducts } from '../../data/landing-content';

export function ProductsSection() {
  return (
    <section id="produtos" className="bg-[#101010] px-5 py-20 sm:px-8 lg:px-16">
      <div className="mx-auto ">
        <RevealOnScroll>
          <div className="mb-16">
            <SectionTitle
              eyebrow="Catálogo"
              title="Equipamentos de Alta Performance"
              description="Do amador ao profissional, personalize seu estilo ou complete seu kit com nossos acessórios premium."
            />
          </div>
        </RevealOnScroll>

        <div className="mb-20">
          <div className="mb-8 flex items-center gap-4">
            <h3 className="text-xl font-bold uppercase tracking-widest text-white sm:text-2xl">
              Caneleiras Personalizáveis
            </h3>
            <div className="h-px flex-1 bg-linear-to-r from-zinc-500 to-transparent opacity-30" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {customProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-8 flex items-center gap-4">
            <h3 className="text-xl font-bold uppercase tracking-widest text-zinc-400 sm:text-2xl">
              Acessórios e Essentials
            </h3>
            <div className="h-px flex-1 bg-linear-to-r from-zinc-700 to-transparent opacity-20" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {storeProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
