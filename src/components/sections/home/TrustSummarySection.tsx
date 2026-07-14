import { Compass, ListChecks, Wifi } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

const points = [
  {
    icon: Compass,
    title: "現場に即した支援",
    description:
      "一般論だけでなく、現場の体制や業務フローを確認したうえで、実行可能な改善策をご提案します。",
  },
  {
    icon: ListChecks,
    title: "課題整理から実行まで",
    description:
      "課題の洗い出し、優先順位の整理、改善計画の作成まで、一貫してサポートします。",
  },
  {
    icon: Wifi,
    title: "オンライン対応",
    description:
      "オンライン相談を中心に、地域を問わず医療・介護・ヘルスケア事業者をご支援します。",
  },
];

export default function TrustSummarySection() {
  return (
    <Section compact>
      <Container>
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
      </Container>
    </Section>
  );
}
