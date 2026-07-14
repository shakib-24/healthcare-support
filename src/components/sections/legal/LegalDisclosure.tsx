import Link from "next/link";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import {
  additionalFeesNotice,
  paymentMethodNotice,
  paymentTimingNotice,
} from "@/config/legal";

const contactReference = (
  <>
    お問い合わせフォームよりご連絡ください。（
    <Link href="/contact" className="text-primary underline-offset-4 hover:underline">
      お問い合わせ・お申し込み
    </Link>
    ）
  </>
);

const facts: { label: string; value: React.ReactNode }[] = [
  { label: "販売事業者名", value: siteConfig.companyName },
  { label: "代表者", value: siteConfig.representative },
  { label: "所在地", value: `${siteConfig.postalCode} ${siteConfig.address}` },
  {
    label: "電話番号",
    value: siteConfig.phone ?? contactReference,
  },
  {
    label: "メールアドレス",
    value: siteConfig.email ?? contactReference,
  },
  { label: "設立", value: siteConfig.established },
  { label: "資本金", value: siteConfig.capital },
  { label: "法人番号", value: siteConfig.corporateNumber },
  {
    label: "販売価格",
    value: (
      <>
        各プランの税込価格は、
        <Link href="/pricing" className="text-primary underline-offset-4 hover:underline">
          サービス・料金ページ
        </Link>
        に記載のとおりです。
      </>
    ),
  },
  { label: "商品代金以外に必要な料金", value: additionalFeesNotice },
  { label: "お支払方法", value: paymentMethodNotice },
  { label: "お支払時期", value: paymentTimingNotice },
  {
    label: "サービス提供時期",
    value: (
      <>
        決済完了後、通常2営業日以内に担当者よりご連絡します。プランごとの詳細な提供時期は、
        <Link href="/pricing" className="text-primary underline-offset-4 hover:underline">
          サービス・料金ページ
        </Link>
        の各プランをご確認ください。
      </>
    ),
  },
  {
    label: "キャンセル・返品について",
    value: (
      <>
        サービスの性質上、提供開始後のキャンセルおよび返金は原則としてお受けできません。プランごとのキャンセル条件は、
        <Link href="/pricing" className="text-primary underline-offset-4 hover:underline">
          サービス・料金ページ
        </Link>
        および
        <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
          利用規約
        </Link>
        に記載のとおりです。
      </>
    ),
  },
];

export default function LegalDisclosure() {
  return (
    <Section>
      <Container narrow>
        <dl className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-surface">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:gap-8">
              <dt className="w-44 shrink-0 text-sm font-semibold text-foreground">{fact.label}</dt>
              <dd className="text-sm leading-[1.8] text-muted-foreground">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
