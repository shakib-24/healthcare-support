import type { Metadata } from "next";
import { Info } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "お支払いは完了していません",
  description: "決済手続きが完了していません。",
  robots: { index: false, follow: false },
};

// TODO(PAY.JP本番連携時):
// このページはPAY.JPからのリダイレクト・Webhookで受け取った決済結果を
// サーバー側で検証したうえで表示すること。決済が中断・失敗した場合の
// 具体的な理由をユーザーに正しく伝えられるよう、検証結果に応じて表示を分けること。
export default function PaymentCancelPage() {
  return (
    <main>
      <Section>
        <Container narrow className="flex flex-col items-start gap-4 py-8">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-muted">
            <Info className="h-5 w-5 text-primary" aria-hidden />
          </span>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            お支払いは完了していません
          </h1>
          <p className="text-base leading-[1.8] text-muted-foreground">
            決済手続きが完了していないため、お申し込みは確定していません。お手数ですが、もう一度お手続きください。ご不明な点がございましたら、お問い合わせフォームよりご連絡ください。
          </p>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/service" variant="primary">
              サービスを見る
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              お問い合わせ
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </main>
  );
}
