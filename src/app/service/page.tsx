import type { Metadata } from "next";
import { canonicalFor } from "@/lib/metadata";
import PageHero from "@/components/layout/PageHero";
import ServiceCards from "@/components/sections/service/ServiceCards";
import ServiceCta from "@/components/sections/service/ServiceCta";

export const metadata: Metadata = {
  title: { absolute: "サービス | 株式会社ブランチ" },
  description:
    "株式会社ブランチが提供する、医療・介護・ヘルスケア事業者向けの業務改善・Web活用・組織づくり・医療人材マッチングサービスをご紹介します。",
  alternates: canonicalFor("/service"),
};

export default function ServicePage() {
  return (
    <main>
      <PageHero
        eyebrow="SERVICES"
        title="事業者様の課題に寄り添うサービス"
        description="株式会社ブランチは、医療・介護・ヘルスケア分野の事業者様に向けて、業務改善、Web活用、組織づくり、医療人材のマッチングを支援しています。"
        breadcrumbs={[{ label: "サービス" }]}
      />
      <ServiceCards />
      <ServiceCta />
    </main>
  );
}
