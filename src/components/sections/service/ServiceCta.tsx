import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";

export default function ServiceCta() {
  return (
    <Section background="primary-dark">
      <Container className="flex flex-col items-start gap-6 sm:items-center sm:text-center">
        <h2 className="max-w-2xl text-[1.75rem] font-bold leading-[1.4] text-white sm:text-[2.25rem] lg:text-[2.5rem]">
          サービスについて相談する
        </h2>
        <ButtonLink href="/contact" variant="secondary">
          お問い合わせ
        </ButtonLink>
      </Container>
    </Section>
  );
}
