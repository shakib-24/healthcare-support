import { ChevronDown } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const faqs = [
  {
    question: "求人掲載は無料ですか？",
    answer: "はい。掲載は無料で、採用が決定した場合のみ成功報酬が発生します。",
  },
  {
    question: "応募後の連絡はどうしますか？",
    answer: "マッチング成立後、専用チャットで勤務条件や詳細を確認できます。",
  },
  {
    question: "どの職種に対応していますか？",
    answer: "看護師、臨床検査技師、放射線技師、理学療法士、作業療法士、言語聴覚士、ヘルパーに対応しています。",
  },
];

export default function MatchingFaq() {
  return (
    <Section id="faq" background="muted">
      <Container narrow className="flex flex-col gap-8">
        <SectionHeading heading="よくある質問" />
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
