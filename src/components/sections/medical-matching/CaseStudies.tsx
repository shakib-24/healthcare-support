import { Quote } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const cases = [
  {
    role: "看護師／30代",
    comment:
      "単発で働けるので、家庭と両立しながら無理なく収入を増やせています。チャットでのやり取りもスムーズで安心して働けます。",
  },
  {
    role: "臨床検査技師／20代",
    comment:
      "色々な医療機関で経験を積めるのが魅力です。自分のスケジュールに合わせて働けるので、とても助かっています。",
  },
  {
    role: "理学療法士／30代",
    comment: "人手が足りない時にすぐに来てもらえるので本当に助かっています。登録から採用までの流れもとても簡単です。",
  },
];

export default function CaseStudies() {
  return (
    <Section>
      <Container className="flex flex-col gap-10">
        <SectionHeading eyebrow="CASE STUDIES" heading="マッチング事例" />
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((item) => (
            <li key={item.role}>
              <Card className="flex h-full flex-col gap-4">
                <Quote className="h-6 w-6 shrink-0 text-accent" aria-hidden />
                <p className="text-sm leading-[1.8] text-foreground">{item.comment}</p>
                <Badge className="mt-auto self-start">{item.role}</Badge>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
