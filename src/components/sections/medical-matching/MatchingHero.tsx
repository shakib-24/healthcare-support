import { FlaskConical, Scan, Syringe } from "lucide-react";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";

const panelItems = [
  { icon: Syringe, label: "看護師" },
  { icon: Scan, label: "放射線技師" },
  { icon: FlaskConical, label: "臨床検査技師" },
];

export default function MatchingHero() {
  return (
    <section className="border-b border-border bg-linear-to-b from-accent-soft via-background to-background">
      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12 lg:py-24">
        <div className="flex flex-col gap-6">
          <span className="text-xs font-semibold uppercase tracking-wide text-accent">
            医療従事者向けスポットワークマッチング
          </span>
          <h1 className="max-w-2xl text-[2.25rem] font-bold leading-[1.4] text-foreground sm:text-[2.75rem] lg:text-[2.75rem]">
            医療資格と臨床経験を有効活用しませんか?
          </h1>
          <p className="max-w-[560px] text-base leading-[1.8] text-muted-foreground sm:text-lg">
            医療スタッフと急な人材不足の医療機関をつなぐマッチングサービス
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <ButtonLink href="/contact" variant="primary">
              お問い合わせ
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              掲載について相談する
            </ButtonLink>
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
            対応職種は7種類。空いた時間を活かせる求人をご案内します。
          </p>
        </div>
      </Container>
    </section>
  );
}
