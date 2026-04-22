import { Card, CardContent } from '@/components/ui/card';
import type { Product } from '@/features/landing/data/landing-content';
import { RevealOnScroll } from '@/features/landing/ui/components/reveal-on-scroll';

type ProductCardProps = {
  product: Product;
  index: number;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <RevealOnScroll delay={index * 80}>
      <Card className="group h-full overflow-hidden rounded-[1.8rem] border-white/8 bg-[#f3f3f1] text-black transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,0,0,0.24)]">
        <CardContent className="flex h-full flex-col p-4">
          <div className="relative overflow-hidden rounded-[1.4rem] bg-white">
            {product.highlight ? (
              <span className="absolute right-3 top-3 z-10 rounded-full bg-emerald-400 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.18em] text-black">
                {product.highlight}
              </span>
            ) : null}
            {product.textImage && (
              <span className="absolute left-3 top-3 z-10 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                {product.textImage}
              </span>
            )}

            {product.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image}
                alt={product.name}
                className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-80 w-full items-center justify-center bg-linear-to-b from-zinc-100 via-zinc-300 to-zinc-500">
                <p className="px-6 text-center text-3xl font-black uppercase leading-none tracking-[-0.06em] text-black">
                  {product.name}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col justify-between px-2 pb-2 pt-5">
            <div>
              <h3 className="text-xl font-semibold leading-6">
                {product.name}
              </h3>
              {product.category ? (
                <p className="mt-2 text-[0.68rem] uppercase tracking-[0.28em] text-black/45">
                  {product.category}
                </p>
              ) : null}
              <p className="mt-4 text-sm leading-6 text-black/68 whitespace-pre-line">
                {product.description}
              </p>
            </div>

            <div className="mt-7">
              <p className="text-3xl font-light tracking-[-0.04em]">
                {formatPrice(product.price)}
              </p>
              {product.installment ? (
                <p className="mt-2 text-sm font-semibold text-black/72">
                  {product.installment}
                </p>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>
    </RevealOnScroll>
  );
}
