import { ArrowRight, Briefcase, Globe, ShieldCheck, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";

const panelItems = [
  { icon: Briefcase, label: "業務改善" },
  { icon: Globe, label: "Web活用" },
  { icon: Users, label: "組織・人材支援" },
];

export default function HeroSection() {
  return (
    <section className="border-b border-border bg-linear-to-b from-accent-soft via-background to-background">
      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12 lg:py-24">
        <div className="flex flex-col gap-6">
          <span className="text-xs font-semibold uppercase tracking-wide text-accent">
            医療・介護・ヘルスケア事業者向け
          </span>
          <h1 className="max-w-2xl text-[2.25rem] font-bold leading-[1.4] text-foreground sm:text-[2.75rem] lg:text-[2.75rem]">
            現場の課題に寄り添い、
            <br />
            より良い仕組みをともにつくる。
          </h1>
          <p className="max-w-[560px] text-base leading-[1.8] text-muted-foreground sm:text-lg">
            株式会社ブランチは、医療・介護・ヘルスケア事業者の業務改善やWeb活用を、現場に即した実践的なコンサルティングで支援します。
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <ButtonLink href="/pricing" variant="primary" icon={ArrowRight}>
              サービス・料金を見る
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              お問い合わせ・お申し込み
            </ButtonLink>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 shrink-0 text-accent" aria-hidden />
            <span>業務改善・Web活用・組織づくりを一つの窓口でサポート</span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
          <ul className="flex flex-col gap-3">
            {panelItems.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-4 rounded-xl border border-border bg-accent-soft px-5 py-4"
              >
                <Icon className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                <span className="text-base font-semibold text-foreground">{label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-[1.8] text-muted-foreground">
            事業の状況を整理し、実行できる改善策をご提案します。
          </p>
        </div>
      </Container>
    </section>
  );
}
