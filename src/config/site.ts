/**
 * Centralized site configuration for Branch Healthcare Support.
 *
 * `phone`, `email`, and `siteUrl` are optional and sourced from environment
 * variables (see `.env.example`). They are only ever `undefined` until real
 * values are configured — never a placeholder string. Components must check
 * for their presence and link to `/contact` instead of rendering a fake
 * value when they are not configured.
 */

export type NavItem = {
  label: string;
  href: string;
};

const rawPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim();
const rawEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteConfig = {
  companyName: "株式会社ブランチ",
  serviceName: "Branch Healthcare Support",
  representative: "小林 由和",
  postalCode: "〒231-0012",
  address: "神奈川県横浜市中区相生町一丁目18番地 光南ビル5F",
  established: "2016年1月15日",
  capital: "5,000,000円",
  corporateNumber: "0200-01-114503",
  phone: rawPhone && rawPhone.length > 0 ? rawPhone : undefined,
  email: rawEmail && rawEmail.length > 0 ? rawEmail : undefined,
  siteUrl: rawSiteUrl && rawSiteUrl.length > 0 ? rawSiteUrl : undefined,
} as const;

/** Header nav: kept intentionally short — legal/terms links live in the footer only. */
export const headerNav: NavItem[] = [
  { label: "ホーム", href: "/" },
  { label: "サービス・料金", href: "/pricing" },
  { label: "お問い合わせ", href: "/contact" },
];

export const footerNav: NavItem[] = [
  { label: "ホーム", href: "/" },
  { label: "サービス・料金", href: "/pricing" },
  { label: "特定商取引法に基づく表記", href: "/legal" },
  { label: "利用規約・プライバシーポリシー", href: "/terms" },
  { label: "お問い合わせ", href: "/contact" },
];
