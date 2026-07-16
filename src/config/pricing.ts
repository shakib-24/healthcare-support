/**
 * Centralized pricing data for Branch Healthcare Support.
 *
 * Shared by the checkout flow, contact form, and terms of service so
 * displayed prices and plan details never drift out of sync.
 */

export type PricingPlanId = "online-consultation" | "business-improvement" | "web-support";

export type PricingPlan = {
  id: PricingPlanId;
  name: string;
  /** Short label used in compact contexts (homepage cards, comparison table headers). */
  shortName: string;
  /** Formatted, tax-included display price. */
  price: string;
  /** Numeric yen amount, for structured/comparison use. */
  priceValue: number;
  billingType: string;
  duration: string;
  description: string;
  targetUsers: string[];
  includedItems: string[];
  delivery: string;
  cancellation: string;
  recommended: boolean;
  checkoutPath: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "online-consultation",
    name: "オンライン相談プラン",
    shortName: "オンライン相談",
    price: "11,000円（税込）",
    priceValue: 11000,
    billingType: "1回払い",
    duration: "60分",
    description:
      "現在抱えている課題を整理し、次に取り組むべき改善方法についてオンラインでアドバイスします。",
    targetUsers: [
      "まずは専門家に相談したい",
      "課題の優先順位を整理したい",
      "短時間で改善の方向性を確認したい",
    ],
    includedItems: [
      "事前ヒアリングフォーム",
      "オンライン面談 60分",
      "課題の整理",
      "改善に向けたアドバイス",
      "面談後の簡易まとめ",
    ],
    delivery: "決済完了後、通常2営業日以内に担当者よりご連絡し、実施日程を調整します。",
    cancellation:
      "実施日の3営業日前までのご連絡で日程変更またはキャンセルが可能です。それ以降のキャンセルおよび実施後の返金は原則としてお受けできません。",
    recommended: false,
    checkoutPath: "/checkout?plan=online-consultation",
  },
  {
    id: "business-improvement",
    name: "業務改善サポートプラン",
    shortName: "業務改善サポート",
    price: "55,000円（税込）",
    priceValue: 55000,
    billingType: "月額・定期課金",
    duration: "1か月単位",
    description:
      "業務上の課題を継続的に整理し、改善施策の検討と実行を月単位でサポートします。",
    targetUsers: [
      "業務改善を継続的に進めたい",
      "社内だけでは改善活動が進みにくい",
      "定期的に相談できる担当者が必要",
    ],
    includedItems: [
      "月2回のオンライン面談（各60分）",
      "現状と課題の整理",
      "改善計画の作成支援",
      "メールによる相談対応",
      "月次振り返り",
    ],
    delivery: "初回決済完了後、通常2営業日以内に担当者よりご連絡し、初回面談の日程を調整します。",
    cancellation:
      "次回決済予定日の5日前までにご連絡いただくことで、翌月以降の契約を解約できます。決済完了後の当月分については返金をお受けできません。",
    recommended: true,
    checkoutPath: "/checkout?plan=business-improvement",
  },
  {
    id: "web-support",
    name: "Web活用支援プラン",
    shortName: "Web活用支援",
    price: "110,000円（税込）",
    priceValue: 110000,
    billingType: "1回払い",
    duration: "分析・提案一式",
    description:
      "Webサイトやオンラインツールの活用状況を確認し、情報発信と業務効率化に向けた改善案をまとめます。",
    targetUsers: [
      "Webサイトを見直したい",
      "オンラインツールを業務に活用したい",
      "改善ポイントを第三者視点で確認したい",
    ],
    includedItems: [
      "事前ヒアリング",
      "Webサイト・運用状況の確認",
      "オンライン面談 2回",
      "改善ポイントの整理",
      "改善提案レポート",
    ],
    delivery:
      "決済完了後、通常2営業日以内に担当者よりご連絡します。初回面談後、原則10営業日以内に改善提案レポートを提供します。",
    cancellation:
      "初回面談日の3営業日前までのご連絡でキャンセルが可能です。初回面談実施後または分析開始後のキャンセル・返金はお受けできません。",
    recommended: false,
    checkoutPath: "/checkout?plan=web-support",
  },
];
