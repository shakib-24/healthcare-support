import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const siteDescription =
  "株式会社ブランチが提供する、医療・介護・ヘルスケア事業者向けの業務改善・Web活用コンサルティングサービスです。";

// Local-only fallback so `next build`/`next dev` work before NEXT_PUBLIC_SITE_URL
// is configured. Never used as, or displayed as, real production data.
const metadataBaseUrl = siteConfig.siteUrl ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(metadataBaseUrl),
  title: {
    default: `${siteConfig.serviceName} | ${siteConfig.companyName}`,
    template: `%s | ${siteConfig.serviceName}`,
  },
  description: siteDescription,
  openGraph: {
    title: `${siteConfig.serviceName} | ${siteConfig.companyName}`,
    description: siteDescription,
    siteName: siteConfig.serviceName,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${siteConfig.serviceName} | ${siteConfig.companyName}`,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[10px] focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          メインコンテンツへスキップ
        </a>
        <Header />
        <div id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
