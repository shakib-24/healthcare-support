import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";
import OrderSummary from "@/components/sections/checkout/OrderSummary";
import CheckoutForm from "@/components/forms/CheckoutForm";
import { pricingPlans } from "@/config/pricing";

export const metadata: Metadata = {
  title: "お申し込み内容の確認",
  description: "お申し込みいただくサービスの内容をご確認いただくページです。",
  robots: { index: false, follow: false },
};

type CheckoutPageProps = {
  searchParams: Promise<{ plan?: string }>;
};

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const { plan: planId } = await searchParams;
  const plan = pricingPlans.find((candidate) => candidate.id === planId);

  if (!plan) {
    return (
      <main>
        <PageHero
          title="お申し込み内容の確認"
          breadcrumbs={[{ label: "お申し込み内容の確認" }]}
        />
        <Section>
          <Container narrow className="flex flex-col items-start gap-4">
            <p className="text-base leading-[1.8] text-muted-foreground">
              指定されたプランが見つかりませんでした。お手数ですが、サービスページから改めてお申し込みください。
            </p>
            <ButtonLink href="/service" variant="primary">
              サービスを見る
            </ButtonLink>
          </Container>
        </Section>
      </main>
    );
  }

  return (
    <main>
      <PageHero
        title="お申し込み内容の確認"
        description="お選びいただいたプランおよびお申し込み内容をご確認いただくページです。内容にお間違いがないかご確認のうえ、お手続きをお進めください。"
        breadcrumbs={[{ label: "お申し込み内容の確認" }]}
      />
      <Section>
        <Container narrow className="flex flex-col gap-8">
          <OrderSummary plan={plan} />
          <CheckoutForm plan={plan} />
          <div className="flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground">
            <p>お申し込みにあたり、以下のページもあわせてご確認ください。</p>
            <div className="flex flex-wrap gap-4">
              <ButtonLink href="/service" variant="text">
                サービス
              </ButtonLink>
              <ButtonLink href="/terms" variant="text">
                利用規約・プライバシーポリシー
              </ButtonLink>
              <ButtonLink href="/legal" variant="text">
                特定商取引法に基づく表記
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
