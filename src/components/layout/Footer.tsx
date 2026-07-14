import Container from "@/components/ui/Container";
import NavLink from "@/components/layout/NavLink";
import { mainNav, siteConfig } from "@/config/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-muted">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">{siteConfig.companyName}</p>
          <p>{siteConfig.serviceName}</p>
          <p>
            {siteConfig.postalCode} {siteConfig.address}
          </p>
          {siteConfig.phone ? (
            <p>
              TEL：
              <a href={`tel:${siteConfig.phone}`} className="hover:text-primary hover:underline">
                {siteConfig.phone}
              </a>
            </p>
          ) : null}
          {siteConfig.email ? (
            <p>
              Email：
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-primary hover:underline"
              >
                {siteConfig.email}
              </a>
            </p>
          ) : null}
        </div>
        <nav aria-label="フッターナビゲーション">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <Container className="border-t border-border py-4">
        <p className="text-xs text-muted-foreground">
          &copy; {year} {siteConfig.companyName}
        </p>
      </Container>
    </footer>
  );
}
