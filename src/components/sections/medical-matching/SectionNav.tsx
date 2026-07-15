import Container from "@/components/ui/Container";

const links = [
  { href: "#popular-jobs", label: "人気の求人" },
  { href: "#professions", label: "職種から探す" },
  { href: "#flow", label: "ご利用の流れ" },
  { href: "#pricing-info", label: "料金について" },
  { href: "#faq", label: "よくある質問" },
];

export default function SectionNav() {
  return (
    <nav aria-label="ページ内ナビゲーション" className="border-b border-border bg-surface">
      {/* Scoped to this page only — the <style> tag unmounts when navigating
          away. Respects prefers-reduced-motion for accessible anchor jumps. */}
      <style>{`@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }`}</style>
      <Container>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 overflow-x-auto py-4 text-sm whitespace-nowrap">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-sm text-muted-foreground outline-none transition-colors duration-200 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
