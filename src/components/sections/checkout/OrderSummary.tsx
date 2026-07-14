import { CheckCircle2 } from "lucide-react";
import Card from "@/components/ui/Card";
import type { PricingPlan } from "@/config/pricing";

type OrderSummaryProps = {
  plan: PricingPlan;
};

export default function OrderSummary({ plan }: OrderSummaryProps) {
  const billingNotice =
    plan.id === "business-improvement"
      ? `このプランは月額${plan.price}の定期課金です。次回決済予定日の5日前までにご連絡いただくことで、翌月以降の解約が可能です。`
      : "このプランは1回払いです。";

  return (
    <Card className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-foreground">{plan.name}</h2>
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-3xl font-bold text-foreground">{plan.price}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {plan.billingType}・{plan.duration}
        </p>
      </div>

      <div className="rounded-xl border border-border bg-accent-soft px-4 py-3 text-sm leading-[1.8] text-foreground">
        {billingNotice}
      </div>

      <div className="flex flex-col gap-2 border-t border-border pt-5">
        <h3 className="text-sm font-semibold text-foreground">サービス内容</h3>
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
          <h3 className="mb-1 text-sm font-semibold text-foreground">提供時期</h3>
          <p>{plan.delivery}</p>
        </div>
        <div>
          <h3 className="mb-1 text-sm font-semibold text-foreground">キャンセルについて</h3>
          <p>{plan.cancellation}</p>
        </div>
      </div>
    </Card>
  );
}
