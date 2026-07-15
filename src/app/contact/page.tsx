import type { Metadata } from "next";
import { canonicalFor } from "@/lib/metadata";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ・お申し込み",
  description:
    "サービスに関するご質問やお申し込み前のご相談を受け付けています。内容を確認後、通常2営業日以内を目安に担当者よりご連絡します。",
  alternates: canonicalFor("/contact"),
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        title="お問い合わせ・お申し込み"
        description="サービスに関するご質問やお申し込み前のご相談を受け付けています。内容を確認後、通常2営業日以内を目安に担当者よりご連絡します。"
        breadcrumbs={[{ label: "お問い合わせ・お申し込み" }]}
      />
      <Section>
        <Container narrow className="flex flex-col gap-8">
          <ContactForm />
          <div className="flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground">
            <p>お申し込み前に、以下のページもあわせてご確認ください。</p>
            <div className="flex flex-wrap gap-4">
              <ButtonLink href="/pricing" variant="text">
                サービス・料金
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
