import type { Metadata } from "next";
import { canonicalFor } from "@/lib/metadata";
import MatchingHero from "@/components/sections/medical-matching/MatchingHero";
import SectionNav from "@/components/sections/medical-matching/SectionNav";
import TrustPoints from "@/components/sections/medical-matching/TrustPoints";
import JobExamples from "@/components/sections/medical-matching/JobExamples";
import Professions from "@/components/sections/medical-matching/Professions";
import ForSeekers from "@/components/sections/medical-matching/ForSeekers";
import ForEmployers from "@/components/sections/medical-matching/ForEmployers";
import CaseStudies from "@/components/sections/medical-matching/CaseStudies";
import MatchingFaq from "@/components/sections/medical-matching/MatchingFaq";
import MatchingCta from "@/components/sections/medical-matching/MatchingCta";

export const metadata: Metadata = {
  title: { absolute: "医療スポット求人マッチング | 株式会社ブランチ" },
  description:
    "医療資格を持つスタッフと、急な人材不足に対応したい医療機関をつなぐスポットワークマッチングサービスです。求人掲載は無料、成功報酬は採用決定時のみ55,000円（税込）。",
  alternates: canonicalFor("/medical-matching"),
};

export default function MedicalMatchingPage() {
  return (
    <main>
      <MatchingHero />
      <SectionNav />
      <TrustPoints />
      <JobExamples />
      <Professions />
      <ForSeekers />
      <ForEmployers />
      <CaseStudies />
      <MatchingFaq />
      <MatchingCta />
    </main>
  );
}
