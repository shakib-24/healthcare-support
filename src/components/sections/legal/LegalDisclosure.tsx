import Link from "next/link";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import {
  additionalFeesNotice,
  paymentMethodNotice,
  paymentTimingNotice,
} from "@/config/legal";

const linkClassName = "text-primary underline-offset-4 hover:underline";

const contactReference = (
  <>
    お問い合わせフォームよりご連絡ください。（
    <Link href="/contact" className={linkClassName}>
      お問い合わせ・お申し込み
    </Link>
    ）
  </>
);

type Fact = { label: string; value: React.ReactNode };

const contactFacts: Fact[] = siteConfig.phone
  ? [
      {
        label: "電話番号",
        value: (
          <a href={`tel:${siteConfig.phone}`} className={linkClassName}>
            {siteConfig.phone}
          </a>
        ),
      },
      {
        label: "受付時間",
        value: "平日10:00〜17:00（土日祝日を除く）",
      },
    ]
  : [{ label: "電話番号", value: contactReference }];

const emailFact: Fact = siteConfig.email
  ? {
      label: "メールアドレス",
      value: (
        <a href={`mailto:${siteConfig.email}`} className={linkClassName}>
          {siteConfig.email}
        </a>
      ),
    }
  : { label: "メールアドレス", value: contactReference };

const siteUrlFacts: Fact[] = siteConfig.siteUrl
  ? [
      {
        label: "サイトURL",
        value: (
          <a
            href={siteConfig.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            {siteConfig.siteUrl}
          </a>
        ),
      },
    ]
  : [];

const facts: Fact[] = [
  { label: "販売事業者名", value: siteConfig.companyName },
  { label: "代表者", value: siteConfig.representative },
  { label: "所在地", value: `${siteConfig.postalCode} ${siteConfig.address}` },
  ...contactFacts,
  emailFact,
  ...siteUrlFacts,
  { label: "設立", value: siteConfig.established },
  { label: "資本金", value: siteConfig.capital },
  { label: "会社法人等番号", value: siteConfig.corporateNumber },
  {
    label: "販売価格",
    value: (
      <>
        各プランの税込価格は、
        <Link href="/pricing" className={linkClassName}>
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
        <Link href="/pricing" className={linkClassName}>
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
        <Link href="/pricing" className={linkClassName}>
          サービス・料金ページ
        </Link>
        および
        <Link href="/terms" className={linkClassName}>
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
          {facts.map((fact, index) => (
            <div
              key={`${fact.label}-${index}`}
              className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:gap-8"
            >
              <dt className="w-44 shrink-0 text-sm font-semibold text-foreground">{fact.label}</dt>
              <dd className="text-sm leading-[1.8] text-muted-foreground">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
