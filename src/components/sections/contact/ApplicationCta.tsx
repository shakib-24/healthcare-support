import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ButtonLink from "@/components/ui/ButtonLink";
import { pricingPlans } from "@/config/pricing";
import { cn } from "@/lib/utils";

export default function ApplicationCta() {
  return (
    <Section background="muted">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          heading="プランをお決まりの方はこちら"
          description="ご希望のプランが決まっている場合は、お申し込み内容の確認画面へ直接お進みいただけます。"
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
              </div>
              <p className="text-sm text-muted-foreground">
                {plan.billingType}・{plan.duration}
              </p>
              <ButtonLink
                href={plan.checkoutPath}
                variant={plan.recommended ? "primary" : "outline"}
                className="mt-auto w-full"
              >
                このプランを申し込む
              </ButtonLink>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
