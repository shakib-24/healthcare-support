import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonLinkVariant = "primary" | "secondary" | "outline" | "outline-light" | "text";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonLinkVariant;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

const baseClasses = cn(
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[10px] px-6 text-sm font-semibold",
  "outline-none transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
);

const variantClasses: Record<ButtonLinkVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-dark",
  secondary: "bg-accent text-primary-foreground hover:opacity-90",
  outline: "border border-border bg-surface text-foreground hover:border-primary hover:text-primary",
  "outline-light": "border border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10",
  text: "min-h-0 px-0 text-primary hover:text-primary-dark hover:underline underline-offset-4",
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  icon: Icon,
  iconPosition = "right",
  className,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(baseClasses, variantClasses[variant], className)} {...rest}>
      {Icon && iconPosition === "left" ? <Icon className="h-4 w-4 shrink-0" aria-hidden /> : null}
      {children}
      {Icon && iconPosition === "right" ? <Icon className="h-4 w-4 shrink-0" aria-hidden /> : null}
    </Link>
  );
}
