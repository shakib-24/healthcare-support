import { CheckCircle2, Circle } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ButtonLink from "@/components/ui/ButtonLink";
import { pricingPlans } from "@/config/pricing";
import { cn } from "@/lib/utils";

export default function PricingPlans() {
  return (
    <Section id="plans">
      <Container className="flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "flex flex-col gap-6",
                plan.recommended && "ring-2 ring-primary",
              )}
            >
              <div className="flex flex-col gap-3">
                {plan.recommended ? (
                  <Badge className="self-start">おすすめ</Badge>
                ) : (
                  <div className="h-[26px]" aria-hidden />
                )}
                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {plan.billingType}・{plan.duration}
                </p>
                <p className="text-sm leading-[1.8] text-muted-foreground">{plan.description}</p>
              </div>

              <div className="flex flex-col gap-2 border-t border-border pt-5">
                <h4 className="text-sm font-semibold text-foreground">こんな方におすすめです</h4>
                <ul className="flex flex-col gap-2">
                  {plan.targetUsers.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Circle className="mt-1.5 h-1.5 w-1.5 shrink-0 fill-accent text-accent" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-2 border-t border-border pt-5">
                <h4 className="text-sm font-semibold text-foreground">サービス内容</h4>
                <ul className="flex flex-col gap-2">
                  {plan.includedItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3 border-t border-border pt-5 text-sm leading-[1.8] text-muted-foreground">
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-foreground">提供時期</h4>
                  <p>{plan.delivery}</p>
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-foreground">キャンセルについて</h4>
                  <p>{plan.cancellation}</p>
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-2 border-t border-border pt-5">
                <ButtonLink
                  href={plan.checkoutPath}
                  variant={plan.recommended ? "primary" : "outline"}
                  className="w-full"
                >
                  このプランを申し込む
                </ButtonLink>
                <p className="text-center text-sm text-muted-foreground">
                  お申し込み内容の確認画面へ進みます
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
