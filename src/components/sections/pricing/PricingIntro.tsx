import { Info } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function PricingIntro() {
  return (
    <Section compact>
      <Container narrow className="flex flex-col gap-8">
        <SectionHeading
          heading="必要な支援を、分かりやすい料金で"
          description={
            <>
              Branch Healthcare Supportでは、医療・介護・ヘルスケア事業者様の課題や取り組みたい内容に応じて、3つの料金プランを提供しています。
              <br />
              <br />
              すべての料金は消費税込みです。サービス内容、提供時期、キャンセル条件をご確認のうえ、お申し込みください。
            </>
          }
        />
        <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface-muted px-5 py-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
          <p className="text-sm leading-[1.8] text-foreground">
            法人・事業者向けサービスです。個人の医療相談、診断、治療に関するサービスは提供していません。
          </p>
        </div>
      </Container>
    </Section>
  );
}
