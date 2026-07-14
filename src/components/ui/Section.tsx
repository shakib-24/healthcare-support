import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionBackground = "default" | "muted" | "accent-soft" | "primary-dark";

type SectionProps = {
  children: ReactNode;
  className?: string;
  background?: SectionBackground;
  /** Reduces vertical padding for tighter, secondary sections. */
  compact?: boolean;
  as?: ElementType;
  id?: string;
};

const backgroundClasses: Record<SectionBackground, string> = {
  default: "bg-background",
  muted: "bg-surface-muted",
  "accent-soft": "bg-accent-soft",
  "primary-dark": "bg-primary-dark",
};

export default function Section({
  children,
  className,
  background = "default",
  compact = false,
  as: Tag = "section",
  id,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        backgroundClasses[background],
        compact ? "py-10 sm:py-14" : "py-16 sm:py-20 lg:py-24",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
