import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  asChild?: boolean;
};

const variantStyles = {
  default:
    "bg-white text-black hover:bg-white/90 border border-white/20 shadow-[0_10px_30px_rgba(255,255,255,0.08)]",
  outline: "border border-white/20 bg-transparent text-white hover:border-white/60 hover:bg-white/6",
  ghost: "border border-transparent bg-transparent text-white/80 hover:text-white hover:bg-white/6",
};

const sizeStyles = {
  default: "h-11 px-5 py-2.5 text-sm",
  sm: "h-9 px-4 text-xs",
  lg: "h-13 px-6 text-sm",
};

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold uppercase tracking-[0.2em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    />
  );
}
