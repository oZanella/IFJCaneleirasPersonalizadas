import { cn } from "@/lib/utils";

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.34em] text-white/45">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-4xl font-black uppercase leading-none tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-sm leading-7 text-white/65 sm:text-base">{description}</p>
      ) : null}
    </div>
  );
}
