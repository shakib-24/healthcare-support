import { ChevronDown } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const faqs = [
  {
    question: "どのプランを選べばよいか分かりません。",
    answer:
      "現在の課題を短時間で整理したい場合は、オンライン相談プランをご検討ください。継続的な改善支援が必要な場合は、業務改善サポートプランが適しています。",
  },
  {
    question: "オンラインで利用できますか？",
    answer:
      "はい。各サービスはオンラインでの面談を基本として提供しています。利用するオンライン会議ツールは、日程調整時にご案内します。",
  },
  {
    question: "医療に関する個人相談はできますか？",
    answer:
      "本サービスは法人・事業者向けの業務改善およびWeb活用支援です。個人の病気、診断、治療、健康状態に関する相談には対応していません。",
  },
  {
    question: "申し込み後、いつ連絡がありますか？",
    answer: "決済完了後、通常2営業日以内を目安に担当者よりご連絡します。",
  },
  {
    question: "日程変更やキャンセルはできますか？",
    answer: "プランごとに条件が異なります。各料金プランに記載されたキャンセル条件をご確認ください。",
  },
  {
    question: "月額プランはいつでも解約できますか？",
    answer: "次回決済予定日の5日前までにご連絡いただくことで、翌月以降の契約を解約できます。",
  },
];

export default function PricingFaq() {
  return (
    <Section>
      <Container narrow className="flex flex-col gap-8">
        <SectionHeading heading="よくあるご質問" />
        <div className="flex flex-col gap-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-border bg-surface px-6 py-5"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold text-foreground marker:content-none">
                <span>{faq.question}</span>
                <ChevronDown
                  className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
