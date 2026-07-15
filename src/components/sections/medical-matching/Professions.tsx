import { Activity, FlaskConical, HandHeart, MessageCircle, Scan, Syringe, Users } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const professions = [
  { icon: Syringe, label: "看護師" },
  { icon: FlaskConical, label: "臨床検査技師" },
  { icon: Scan, label: "放射線技師" },
  { icon: Activity, label: "理学療法士" },
  { icon: HandHeart, label: "作業療法士" },
  { icon: MessageCircle, label: "言語聴覚士" },
  { icon: Users, label: "ヘルパー" },
];

export default function Professions() {
  return (
    <Section id="professions">
      <Container className="flex flex-col gap-10">
        <SectionHeading eyebrow="PROFESSIONS" heading="選べる7つの医療職種" />
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {professions.map(({ icon: Icon, label }) => (
            <li key={label}>
              <div className="flex h-full flex-col items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-6 text-center shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft">
                  <Icon className="h-5 w-5 text-accent" aria-hidden />
                </span>
                <span className="text-sm font-semibold text-foreground">{label}</span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
