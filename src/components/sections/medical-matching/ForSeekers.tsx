import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ButtonLink from "@/components/ui/ButtonLink";

const steps = [
  "プロフィールと保有資格を登録",
  "職種・勤務地・働き方で求人検索",
  "成立後はチャットで勤務条件を確認",
];

export default function ForSeekers() {
  return (
    <Section id="flow">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="FOR MEDICAL STAFF"
          heading="求職者の方へ"
          description="資格や希望条件を登録して、スポット勤務・業務委託の求人をすぐに探せます。"
        />
        <ol className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step} className="flex flex-col gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {index + 1}
              </span>
              <p className="text-base font-semibold leading-[1.7] text-foreground">{step}</p>
            </li>
          ))}
        </ol>
        <ButtonLink href="/contact" variant="outline" className="self-start">
          お問い合わせ
        </ButtonLink>
      </Container>
    </Section>
  );
}
