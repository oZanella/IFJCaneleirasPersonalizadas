import { cn } from "@/lib/utils";

type ProductArtworkProps = {
  label: string;
  accentClass: string;
  className?: string;
};

export function ProductArtwork({
  label,
  accentClass,
  className,
}: ProductArtworkProps) {
  return (
    <div
      className={cn(
        "relative mx-auto flex h-[18rem] w-[11.5rem] items-center justify-center rounded-[2.4rem] border border-black/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),rgba(255,255,255,0.65)_48%,rgba(0,0,0,0.14)_100%)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)]",
        className,
      )}
    >
      <div className={cn("absolute inset-4 rounded-[2rem] bg-gradient-to-b opacity-40", accentClass)} />
      <div className="relative z-10 text-center">
        <p className="text-4xl font-black uppercase leading-none tracking-[-0.08em] text-black">
          {label}
        </p>
      </div>
    </div>
  );
}
