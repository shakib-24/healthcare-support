import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** Constrains width to a comfortable reading measure (~760px) for text-heavy content. */
  narrow?: boolean;
};

export default function Container({ children, className, narrow = false }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        narrow ? "max-w-[760px]" : "max-w-[1200px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
