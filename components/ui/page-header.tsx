import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  highlightText?: string;
  subtitle?: string;
  className?: string;
  children?: ReactNode;
  toneColor?: string;
};

export function PageHeader({
  title,
  highlightText,
  subtitle,
  className,
  children,
  toneColor = "var(--tone-primary)",
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "relative overflow-hidden border-b border-border/70 px-4 pb-3 pt-5 sm:px-6 sm:pb-4 sm:pt-6",
        className,
      )}
      style={{ ["--tone-color" as string]: toneColor }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at top right, color-mix(in oklab, var(--tone-color) 20%, transparent) 0%, transparent 50%), linear-gradient(90deg, color-mix(in oklab, var(--tone-color) 8%, transparent), transparent 40%)",
        }}
      />

      <div className="tone-line absolute bottom-0 left-0 h-px w-full opacity-70" />

      <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="flex items-center gap-2 text-2xl font-black uppercase tracking-[-0.04em] sm:text-4xl">
            <span>{title}</span>
            {highlightText ? (
              <span style={{ color: "var(--tone-color)" }}>{highlightText}</span>
            ) : null}
          </h1>
          {subtitle ? (
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground sm:text-xs">
              {subtitle}
            </p>
          ) : null}
        </div>

        {children ? <div className="flex items-center gap-2">{children}</div> : null}
      </div>
    </header>
  );
}
