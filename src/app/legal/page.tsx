import type { Metadata } from "next";
import { canonicalFor } from "@/lib/metadata";
import PageHero from "@/components/layout/PageHero";
import LegalDisclosure from "@/components/sections/legal/LegalDisclosure";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description:
    "特定商取引法に基づき、株式会社ブランチの事業者情報および取引条件を表記しています。",
  alternates: canonicalFor("/legal"),
};

export default function LegalPage() {
  return (
    <main>
      <PageHero
        title="特定商取引法に基づく表記"
        description="特定商取引法第11条の規定に基づき、当社が提供するサービスに関する事業者情報および取引条件を、このページにて表記いたします。"
        breadcrumbs={[{ label: "特定商取引法に基づく表記" }]}
      />
      <LegalDisclosure />
    </main>
  );
}
