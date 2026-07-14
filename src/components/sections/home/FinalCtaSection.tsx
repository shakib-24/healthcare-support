import { ArrowRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";

export default function FinalCtaSection() {
  return (
    <Section background="primary-dark">
      <Container className="flex flex-col items-start gap-6 sm:items-center sm:text-center">
        <h2 className="max-w-2xl text-[1.75rem] font-bold leading-[1.4] text-white sm:text-[2.25rem] lg:text-[2.5rem]">
          事業の課題を、一緒に整理しませんか？
        </h2>
        <p className="max-w-[640px] text-base leading-[1.8] text-white/80 sm:text-lg">
          現在のお悩みや取り組みたい内容をお聞かせください。ご相談内容を確認し、適したサービスをご案内します。
        </p>
        <div className="flex flex-wrap items-center gap-4 sm:justify-center">
          <ButtonLink href="/contact" variant="secondary" icon={ArrowRight}>
            お問い合わせ・お申し込み
          </ButtonLink>
          <ButtonLink href="/pricing" variant="outline-light">
            料金プランを見る
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
