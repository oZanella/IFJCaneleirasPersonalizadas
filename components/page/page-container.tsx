import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("surface-card flex min-h-0 w-full flex-1 flex-col p-3 sm:p-4", className)}>
      {children}
    </div>
  );
}
