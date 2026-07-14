import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-accent-soft px-3 py-1 text-xs font-semibold text-primary",
        className,
      )}
    >
      {children}
    </span>
  );
}
