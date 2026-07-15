import { Calendar, FlaskConical, JapaneseYen, MapPin, Scan, Syringe } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const jobs = [
  {
    icon: Scan,
    role: "放射線技師",
    title: "健康診断での胃部撮影",
    location: "横浜市西区",
    schedule: "8：30〜12：30",
    pay: "25,000円（交通費別途実費）",
  },
  {
    icon: Syringe,
    role: "看護師スポット",
    title: "大学健診での問診",
    location: "東京都世田谷区",
    schedule: "9：00〜15：00",
    pay: "15,000円（交通費別途実費）",
  },
  {
    icon: FlaskConical,
    role: "臨床検査技師スポット",
    title: "施設内での腹部エコー",
    location: "東京都中央区",
    schedule: "9：00〜12：30",
    pay: "20,000円（交通費別途）",
  },
];

export default function JobExamples() {
  return (
    <Section id="popular-jobs" background="muted">
      <Container className="flex flex-col gap-10">
        <SectionHeading eyebrow="JOB EXAMPLES" heading="スポットワークの例" />
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <li key={job.title}>
              <Card className="flex h-full flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft">
                    <job.icon className="h-5 w-5 text-accent" aria-hidden />
                  </span>
                  <Badge>{job.role}</Badge>
                </div>
                <h3 className="text-base font-bold leading-[1.6] text-foreground">{job.title}</h3>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                    <span>{job.location}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                    <span>{job.schedule}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <JapaneseYen className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                    <span>{job.pay}</span>
                  </li>
                </ul>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
