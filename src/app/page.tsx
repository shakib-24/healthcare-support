import type { Metadata } from "next";
import { canonicalFor } from "@/lib/metadata";
import HeroSection from "@/components/sections/home/HeroSection";
import TrustSummarySection from "@/components/sections/home/TrustSummarySection";
import ChallengesSection from "@/components/sections/home/ChallengesSection";
import ServicesSection from "@/components/sections/home/ServicesSection";
import StrengthsSection from "@/components/sections/home/StrengthsSection";
import ProcessSection from "@/components/sections/home/ProcessSection";
import CompanySection from "@/components/sections/home/CompanySection";
import FinalCtaSection from "@/components/sections/home/FinalCtaSection";

export const metadata: Metadata = {
  title: { absolute: "Branch Healthcare Support | 株式会社ブランチ" },
  description:
    "株式会社ブランチが提供する、医療・介護・ヘルスケア事業者向けの業務改善・Web活用・組織づくりコンサルティングサービスです。",
  alternates: canonicalFor("/"),
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustSummarySection />
      <ChallengesSection />
      <ServicesSection />
      <StrengthsSection />
      <ProcessSection />
      <CompanySection />
      <FinalCtaSection />
    </main>
  );
}
