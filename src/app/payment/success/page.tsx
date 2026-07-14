import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "お申し込みありがとうございます",
  description: "お申し込みを受け付けました。",
  robots: { index: false, follow: false },
};

// TODO(PAY.JP本番連携時):
// このページはPAY.JPからのリダイレクト・Webhookで受け取った決済結果を
// サーバー側で検証したうえで表示すること。検証済みの結果が得られない場合は、
// 決済が完了したという表現を表示しないこと。
export default function PaymentSuccessPage() {
  return (
    <main>
      <Section>
        <Container narrow className="flex flex-col items-start gap-4 py-8">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft">
            <CheckCircle2 className="h-5 w-5 text-accent" aria-hidden />
          </span>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            お申し込みありがとうございます
          </h1>
          <p className="text-base leading-[1.8] text-muted-foreground">
            お申し込み内容を受け付けました。内容の確認後、担当者よりご連絡します。
          </p>
          <ButtonLink href="/" variant="primary">
            トップページに戻る
          </ButtonLink>
        </Container>
      </Section>
    </main>
  );
}
