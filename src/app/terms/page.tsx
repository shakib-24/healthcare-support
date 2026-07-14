import type { Metadata } from "next";
import { canonicalFor } from "@/lib/metadata";
import PageHero from "@/components/layout/PageHero";
import TermsOfService from "@/components/sections/terms/TermsOfService";
import PrivacyPolicy from "@/components/sections/terms/PrivacyPolicy";

export const metadata: Metadata = {
  title: "利用規約・プライバシーポリシー",
  description:
    "株式会社ブランチが提供するサービスの利用規約およびプライバシーポリシーを掲載しています。",
  alternates: canonicalFor("/terms"),
};

export default function TermsPage() {
  return (
    <main>
      <PageHero
        title="利用規約・プライバシーポリシー"
        description="当社のサービスをご利用いただくお客様に適用される利用規約、および個人情報の取り扱いに関するプライバシーポリシーを、このページにて定めています。"
        breadcrumbs={[{ label: "利用規約・プライバシーポリシー" }]}
      />
      <TermsOfService />
      <PrivacyPolicy />
    </main>
  );
}
