import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/ui/Breadcrumbs";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
};

export default function PageHero({ eyebrow, title, description, breadcrumbs }: PageHeroProps) {
  return (
    <div className="border-b border-border bg-accent-soft">
      <Container className="flex flex-col gap-6 py-12 sm:py-16">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
        <div className="flex flex-col gap-4">
          {eyebrow ? (
            <span className="text-xs font-semibold uppercase tracking-wide text-accent">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="text-[2.25rem] font-bold leading-[1.3] text-foreground sm:text-[2.75rem] lg:text-[3.25rem]">
            {title}
          </h1>
          {description ? (
            <p className="max-w-[720px] text-base leading-[1.8] text-muted-foreground sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
