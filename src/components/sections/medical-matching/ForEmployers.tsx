import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ButtonLink from "@/components/ui/ButtonLink";

const steps = ["求人情報を無料で掲載", "応募者プロフィールを確認して選考", "採用決定後に成功報酬をお支払い"];

export default function ForEmployers() {
  return (
    <Section background="muted">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="FOR FACILITIES"
          heading="求人者の方へ"
          description="求人掲載は無料。必要な時だけ医療資格者を募集し、採用決定時のみ費用が発生します。"
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
          掲載について相談する
        </ButtonLink>
      </Container>
    </Section>
  );
}
