import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  compact?: boolean;
};

export function BrandLogo({ className, compact = false }: BrandLogoProps) {
  return (
    <a
      href="#inicio"
      className={cn(
        "group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 transition hover:border-white/25 hover:bg-white/[0.05]",
        className,
      )}
      aria-label="Ir para o topo do site"
    >
      <div
        className={cn(
          "overflow-hidden rounded-xl border border-white/10 bg-white",
          compact ? "h-11 w-20" : "h-16 w-28 sm:h-20 sm:w-36",
        )}
      >
        <Image
          src="/ifj-monogram.svg"
          alt="Logo IFJ Caneleiras"
          width={420}
          height={140}
          className="h-full w-full object-cover"
        />
      </div>

      <div className={cn("min-w-0", compact ? "hidden sm:block" : "")}>
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-white/42">
          Assinatura visual
        </p>
        <p className="mt-1 text-sm font-semibold text-white/82">
          IFJ Caneleiras
        </p>
      </div>
    </a>
  );
}
