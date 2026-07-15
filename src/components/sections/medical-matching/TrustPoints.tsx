import { CheckCircle2, Gift, JapaneseYen, ShieldCheck } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const points = [
  {
    icon: Gift,
    title: "掲載無料",
    description: "医療機関は無料で求人掲載が可能です。",
  },
  {
    icon: ShieldCheck,
    title: "安心の本人確認",
    description: "資格・身分証で安心のマッチングを実現します。",
  },
  {
    icon: JapaneseYen,
    title: "成功報酬型（55,000円 税込）",
    description: "採用決定時のみ費用が発生します。",
  },
];

// This is the job-matching service's own pricing structure — kept entirely
// separate from the consulting plans in src/config/pricing.ts / PAY.JP.
const pricingFacts = ["求人掲載は無料", "採用決定時のみ成功報酬が発生", "成功報酬：55,000円（税込）"];

export default function TrustPoints() {
  return (
    <Section id="pricing-info">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="PRICING"
          heading="料金について"
          description="求人掲載は無料です。採用決定時のみ成功報酬が発生します。"
        />
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {points.map(({ icon: Icon, title, description }) => (
            <li key={title} className="flex flex-col gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft">
                <Icon className="h-5 w-5 text-accent" aria-hidden />
              </span>
              <h3 className="text-lg font-bold text-foreground">{title}</h3>
              <p className="text-sm leading-[1.8] text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-2 rounded-2xl border border-border bg-accent-soft px-6 py-5 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2">
          {pricingFacts.map((fact) => (
            <li key={fact} className="flex items-center gap-2 text-sm font-semibold text-primary-dark">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" aria-hidden />
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
