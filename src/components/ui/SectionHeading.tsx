import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  heading: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  level?: "h2" | "h3";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  heading,
  description,
  align = "left",
  level = "h2",
  className,
}: SectionHeadingProps) {
  const HeadingTag = level;
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        isCenter ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-wide text-accent">
          {eyebrow}
        </span>
      ) : null}
      <HeadingTag
        className={cn(
          "font-bold leading-[1.3] text-foreground",
          level === "h2"
            ? "text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem]"
            : "text-xl sm:text-2xl",
        )}
      >
        {heading}
      </HeadingTag>
      {description ? (
        <p
          className={cn(
            "text-base leading-[1.8] text-muted-foreground sm:text-lg",
            isCenter ? "max-w-[720px]" : "max-w-[640px]",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
