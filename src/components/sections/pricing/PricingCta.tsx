import { ArrowRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";
import { pricingPlans } from "@/config/pricing";

const onlineConsultationPlan = pricingPlans[0];

export default function PricingCta() {
  return (
    <Section background="primary-dark">
      <Container className="flex flex-col items-start gap-6 sm:items-center sm:text-center">
        <h2 className="max-w-2xl text-[1.75rem] font-bold leading-[1.4] text-white sm:text-[2.25rem]">
          ご希望のプランをお選びください
        </h2>
        <p className="max-w-[640px] text-base leading-[1.8] text-white/80 sm:text-lg">
          サービス内容について確認したい点がある場合は、お申し込み前にお問い合わせいただけます。
        </p>
        <div className="flex flex-wrap items-center gap-4 sm:justify-center">
          <ButtonLink href="/contact" variant="outline-light">
            お問い合わせ
          </ButtonLink>
          <ButtonLink
            href={onlineConsultationPlan.checkoutPath}
            variant="secondary"
            icon={ArrowRight}
          >
            オンライン相談を申し込む
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
