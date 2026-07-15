import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";

export default function MatchingCta() {
  return (
    <Section background="primary-dark">
      <Container className="flex flex-col items-start gap-6 sm:items-center sm:text-center">
        <h2 className="max-w-2xl text-[1.75rem] font-bold leading-[1.4] text-white sm:text-[2.25rem] lg:text-[2.5rem]">
          求人掲載も、お仕事探しも、まずはお問い合わせから。
        </h2>
        <p className="max-w-[640px] text-base leading-[1.8] text-white/80 sm:text-lg">
          スポット求人の詳細や掲載条件について、お気軽にお問い合わせください。内容を確認のうえ、担当者よりご連絡します。
        </p>
        <div className="flex flex-wrap items-center gap-4 sm:justify-center">
          <ButtonLink href="/contact" variant="secondary">
            お問い合わせ
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline-light">
            掲載について相談する
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
