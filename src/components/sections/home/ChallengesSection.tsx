import { CircleAlert } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

const challenges = [
  "紙やExcel中心の業務が多く、情報管理に時間がかかっている",
  "Webサイトやオンラインツールを十分に活用できていない",
  "業務が担当者個人に依存し、引き継ぎが難しい",
  "スタッフ間の情報共有や業務ルールを整理したい",
  "新しい施策を始めたいが、社内に進められる人材がいない",
  "経営課題と現場課題を整理し、優先順位を明確にしたい",
];

export default function ChallengesSection() {
  return (
    <Section background="muted">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="CHALLENGES"
          heading="このようなお悩みはありませんか？"
          description="日々の業務に追われ、改善したい課題があっても、どこから手をつけるべきか分からない事業者様を支援します。"
        />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((challenge) => (
            <li key={challenge}>
              <Card className="flex h-full flex-row items-start gap-3">
                <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                <p className="text-sm leading-[1.8] text-foreground">{challenge}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
