import { ArrowRight, Globe, HeartHandshake, UserCog, Workflow, type LucideIcon } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import ButtonLink from "@/components/ui/ButtonLink";

type ServiceCard = {
  icon: LucideIcon;
  title: string;
  description: string;
  linkLabel?: string;
  linkHref?: string;
};

const services: ServiceCard[] = [
  {
    icon: Workflow,
    title: "業務改善コンサルティング",
    description:
      "医療・介護・ヘルスケア事業者様の業務フローや情報管理方法を整理し、現場の負担軽減と業務品質の向上につながる改善をご支援します。",
  },
  {
    icon: Globe,
    title: "Web活用支援",
    description:
      "Webサイトやオンラインツールの活用状況を確認し、情報発信や業務効率化につながる改善方法をご提案します。",
  },
  {
    icon: UserCog,
    title: "組織・人材支援",
    description:
      "業務分担、情報共有、マニュアル整備などを通じて、スタッフが継続して運用できる組織づくりを支援します。",
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

export default function ServiceCards() {
  return (
    <Section>
      <Container className="flex flex-col gap-10">
        <SectionHeading eyebrow="WHAT WE DO" heading="提供するサービス" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {services.map(({ icon: Icon, title, description, linkLabel, linkHref }) => (
            <Card key={title} className="flex flex-col gap-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft">
                <Icon className="h-5 w-5 text-accent" aria-hidden />
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-foreground">{title}</h3>
                <p className="text-sm leading-[1.8] text-muted-foreground">{description}</p>
              </div>
              {linkHref && linkLabel ? (
                <ButtonLink
                  href={linkHref}
                  variant="text"
                  icon={ArrowRight}
                  className="mt-auto self-start"
                >
                  {linkLabel}
                </ButtonLink>
              ) : null}
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
