import { cn } from '@/lib/utils';

type ProductArtworkProps = {
  label: string;
  accentClass: string;
  className?: string;
  image?: string;
};

export function ProductArtwork({
  label,
  accentClass,
  className,
  image,
}: ProductArtworkProps) {
  return (
    <div
      className={cn(
        'relative mx-auto flex h-72 w-46 items-center justify-center rounded-[2.4rem] border border-black/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),rgba(255,255,255,0.65)_48%,rgba(0,0,0,0.14)_100%)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] overflow-hidden', // Adicionado overflow-hidden
        className,
      )}
    >
      <div
        className={cn(
          'absolute inset-4 rounded-[2rem] bg-linear-to-b opacity-40',
          accentClass,
        )}
      />

      <div className="relative z-10 flex h-full w-full items-center justify-center text-center">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={label}
            className="h-full w-full object-contain"
          />
        ) : (
          <p className="text-4xl font-black uppercase leading-none tracking-[-0.08em] text-black">
            {label}
          </p>
        )}
      </div>
    </div>
  );
}
