import { ArrowRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ButtonLink from "@/components/ui/ButtonLink";
import { pricingPlans } from "@/config/pricing";
import { cn } from "@/lib/utils";

export default function PricingPreviewSection() {
  return (
    <Section background="muted">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="PRICING"
          heading="目的に合わせて選べる料金プラン"
          description="初回のご相談から継続的な業務改善まで、分かりやすい料金体系でご用意しています。"
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.id}
              className={cn("flex flex-col gap-4", plan.recommended && "ring-2 ring-primary")}
            >
              {plan.recommended ? (
                <Badge className="self-start">おすすめ</Badge>
              ) : (
                <div className="h-[26px]" aria-hidden />
              )}
              <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                <span className="text-sm text-muted-foreground">
                  / {plan.billingType}・{plan.duration}
                </span>
              </div>
              <p className="text-sm leading-[1.8] text-muted-foreground">{plan.description}</p>
            </Card>
          ))}
        </div>
        <ButtonLink href="/pricing" variant="primary" icon={ArrowRight} className="self-center">
          料金とサービス内容を詳しく見る
        </ButtonLink>
      </Container>
    </Section>
  );
}
