import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const strengths = [
  {
    number: "01",
    title: "丁寧なヒアリング",
    description:
      "事業内容や現在の体制、現場で発生している課題を丁寧に確認し、目的を共有したうえで支援を開始します。",
  },
  {
    number: "02",
    title: "実行できる改善提案",
    description: "規模や予算、スタッフ体制を考慮し、無理なく実施できる方法を優先してご提案します。",
  },
  {
    number: "03",
    title: "継続しやすい仕組みづくり",
    description: "一時的な対応で終わらず、事業者様自身が継続して運用できる状態を目指します。",
  },
];

export default function StrengthsSection() {
  return (
    <Section background="accent-soft">
      <Container className="flex flex-col gap-10">
        <SectionHeading eyebrow="WHY BRANCH" heading="株式会社ブランチが大切にしていること" />
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {strengths.map(({ number, title, description }) => (
            <div key={number} className="flex flex-col gap-3">
              <span className="text-4xl font-bold text-primary/25 sm:text-5xl">{number}</span>
              <h3 className="text-xl font-bold text-foreground">{title}</h3>
              <p className="text-sm leading-[1.8] text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
