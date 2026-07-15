import Link from "next/link";
import Container from "@/components/ui/Container";
import HeaderNav from "@/components/layout/HeaderNav";
import { siteConfig } from "@/config/site";

export default function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="rounded-sm text-base font-bold tracking-tight text-primary outline-none transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {siteConfig.companyName}
        </Link>
        <HeaderNav />
      </Container>
    </header>
  );
}
