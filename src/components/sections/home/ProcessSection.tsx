import { ArrowRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ButtonLink from "@/components/ui/ButtonLink";

const steps = [
  {
    title: "お問い合わせ",
    description: "お問い合わせフォームより、ご相談内容や希望するサービスをお知らせください。",
  },
  {
    title: "内容の確認",
    description: "担当者が内容を確認し、通常2営業日以内を目安にご連絡します。",
  },
  {
    title: "お申し込み・お支払い",
    description: "サービス内容と日程をご確認いただき、対象プランのお申し込みと決済を行います。",
  },
  {
    title: "サービス開始",
    description: "オンライン面談または事前に合意した方法で、ヒアリングと支援を開始します。",
  },
];

export default function ProcessSection() {
  return (
    <Section>
      <Container className="flex flex-col gap-10">
        <SectionHeading eyebrow="FLOW" heading="ご相談からサービス開始まで" />
        <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {index + 1}
              </span>
              <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
              <p className="text-sm leading-[1.8] text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
        <ButtonLink href="/contact" variant="outline" icon={ArrowRight} className="self-start">
          相談内容を送る
        </ButtonLink>
      </Container>
    </Section>
  );
}
