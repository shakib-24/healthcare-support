import { FileText } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";

export default function PricingLegalLinks() {
  return (
    <Section background="muted" compact>
      <Container narrow className="flex flex-col items-start gap-4">
        <div className="flex items-start gap-3">
          <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
          <p className="text-sm leading-[1.8] text-foreground">
            お申し込み前に、料金、サービス提供条件、キャンセル条件、利用規約をご確認ください。
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="/legal" variant="text">
            特定商取引法に基づく表記
          </ButtonLink>
          <ButtonLink href="/terms" variant="text">
            利用規約・プライバシーポリシー
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
