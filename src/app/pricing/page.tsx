import type { Metadata } from "next";
import { canonicalFor } from "@/lib/metadata";
import PageHero from "@/components/layout/PageHero";
import PricingIntro from "@/components/sections/pricing/PricingIntro";
import PricingPlans from "@/components/sections/pricing/PricingPlans";
import ServiceComparison from "@/components/sections/pricing/ServiceComparison";
import PricingFlow from "@/components/sections/pricing/PricingFlow";
import PricingNotes from "@/components/sections/pricing/PricingNotes";
import PricingFaq from "@/components/sections/pricing/PricingFaq";
import PricingLegalLinks from "@/components/sections/pricing/PricingLegalLinks";
import PricingCta from "@/components/sections/pricing/PricingCta";

export const metadata: Metadata = {
  title: "サービス・料金",
  description:
    "株式会社ブランチが提供する医療・介護・ヘルスケア事業者向けコンサルティングサービスの内容と料金をご案内します。",
  alternates: canonicalFor("/pricing"),
};

export default function PricingPage() {
  return (
    <main>
      <PageHero
        eyebrow="SERVICES & PRICING"
        title="サービス・料金"
        description="課題整理のための単発相談から、継続的な業務改善支援まで、目的に合わせて選べる3つのプランをご用意しています。"
        breadcrumbs={[{ label: "サービス・料金" }]}
      />
      <PricingIntro />
      <PricingPlans />
      <ServiceComparison />
      <PricingFlow />
      <PricingNotes />
      <PricingFaq />
      <PricingLegalLinks />
      <PricingCta />
    </main>
  );
}
