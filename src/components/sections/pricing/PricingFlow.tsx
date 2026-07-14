import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    title: "プランを選択",
    description: "ご希望のサービス内容に合わせて、3つのプランからお選びください。",
  },
  {
    title: "お申し込み内容を確認",
    description: "選択したプランの料金、サービス内容、キャンセル条件をご確認いただきます。",
  },
  {
    title: "クレジットカードで決済",
    description: "確認画面の内容にお間違いがなければ、クレジットカードでお支払いを行います。",
  },
  {
    title: "担当者よりご連絡",
    description: "決済完了後、通常2営業日以内を目安に担当者よりご連絡します。",
  },
  {
    title: "サービス開始",
    description: "ご都合を確認のうえ、面談日程を調整し、サービスを開始します。",
  },
];

export default function PricingFlow() {
  return (
    <Section>
      <Container className="flex flex-col gap-10">
        <SectionHeading heading="サービス提供の流れ" />
        <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {index + 1}
              </span>
              <h3 className="text-base font-bold text-foreground">{step.title}</h3>
              <p className="text-sm leading-[1.8] text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
