import {
  ArrowRight,
  CheckCircle2,
  Globe,
  HeartHandshake,
  UserCog,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import ButtonLink from "@/components/ui/ButtonLink";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  items?: string[];
  linkLabel: string;
  linkHref: string;
};

const services: Service[] = [
  {
    icon: Workflow,
    title: "業務改善コンサルティング",
    description:
      "現在の業務フローや情報管理方法を整理し、負担軽減と業務品質の向上につながる改善策をご提案します。",
    items: ["業務フローの整理", "課題・ボトルネックの可視化", "改善計画の作成", "運用ルールの見直し"],
    linkLabel: "料金プランを見る",
    linkHref: "/service",
  },
  {
    icon: Globe,
    title: "Web活用支援",
    description:
      "Webサイトやオンラインツールの活用状況を確認し、情報発信や業務効率化につながる改善をご支援します。",
    items: ["Webサイトの改善提案", "情報発信の整理", "オンラインツールの活用支援", "デジタル業務の導入相談"],
    linkLabel: "料金プランを見る",
    linkHref: "/service",
  },
  {
    icon: UserCog,
    title: "組織・人材支援",
    description:
      "業務の属人化や情報共有の課題を整理し、スタッフが継続して運用できる仕組みづくりを支援します。",
    items: ["役割・業務分担の整理", "業務マニュアル作成支援", "社内情報共有の改善", "人材育成方針の整理"],
    linkLabel: "料金プランを見る",
    linkHref: "/service",
  },
  {
    icon: HeartHandshake,
    title: "医療スポット求人マッチング",
    description:
      "医療資格や臨床経験を活かして働きたい方と、人材を必要とする医療機関をつなぐマッチングサービスです。",
    linkLabel: "サービス詳細を見る",
    linkHref: "/medical-matching",
  },
];

export default function ServicesSection() {
  return (
    <Section>
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="SERVICES"
          heading="事業に合わせた3つの支援"
          description="現在の課題や事業規模に合わせて、必要な支援を組み合わせてご提案します。"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {services.map(({ icon: Icon, title, description, items, linkLabel, linkHref }) => (
            <Card key={title} className="flex flex-col gap-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft">
                <Icon className="h-5 w-5 text-accent" aria-hidden />
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-foreground">{title}</h3>
                <p className="text-sm leading-[1.8] text-muted-foreground">{description}</p>
              </div>
              {items ? (
                <ul className="flex flex-col gap-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <ButtonLink
                href={linkHref}
                variant="text"
                icon={ArrowRight}
                className="mt-auto self-start"
              >
                {linkLabel}
              </ButtonLink>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
