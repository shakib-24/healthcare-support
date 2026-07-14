import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { pricingPlans } from "@/config/pricing";
import { cn } from "@/lib/utils";

type ComparisonRow = {
  label: string;
  values: [string, string, string];
};

const INCLUDED = "あり";
const NOT_INCLUDED = "－";

const rows: ComparisonRow[] = [
  {
    label: "料金",
    values: pricingPlans.map((plan) => plan.price) as [string, string, string],
  },
  {
    label: "支払方法",
    values: pricingPlans.map((plan) => plan.billingType) as [string, string, string],
  },
  {
    label: "オンライン面談",
    values: ["60分・1回", "月2回（各60分）", "60分・2回"],
  },
  {
    label: "課題整理",
    values: [INCLUDED, INCLUDED, NOT_INCLUDED],
  },
  {
    label: "改善計画",
    values: [NOT_INCLUDED, INCLUDED, NOT_INCLUDED],
  },
  {
    label: "メール相談",
    values: [NOT_INCLUDED, INCLUDED, NOT_INCLUDED],
  },
  {
    label: "改善提案レポート",
    values: [NOT_INCLUDED, NOT_INCLUDED, INCLUDED],
  },
  {
    label: "継続サポート",
    values: [NOT_INCLUDED, INCLUDED, NOT_INCLUDED],
  },
];

export default function ServiceComparison() {
  return (
    <Section background="muted">
      <Container className="flex flex-col gap-8">
        <SectionHeading heading="プラン比較" />
        <p className="text-sm text-muted-foreground sm:hidden">
          表を左右にスクロールしてご確認いただけます。
        </p>
        <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <caption className="sr-only">プランごとのサービス内容比較表</caption>
            <thead>
              <tr className="border-b border-border">
                <th
                  scope="col"
                  className="sticky left-0 z-10 bg-surface px-4 py-4 text-left font-semibold text-foreground"
                >
                  サービス内容
                </th>
                {pricingPlans.map((plan) => (
                  <th
                    key={plan.id}
                    scope="col"
                    className="px-4 py-4 text-left font-semibold text-foreground"
                  >
                    {plan.shortName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => {
                const rowBg = index % 2 === 1 ? "bg-background" : "bg-surface";
                return (
                  <tr key={row.label} className={rowBg}>
                    <th
                      scope="row"
                      className={cn(
                        "sticky left-0 z-10 px-4 py-4 text-left font-medium text-foreground",
                        rowBg,
                      )}
                    >
                      {row.label}
                    </th>
                    {row.values.map((value, valueIndex) => (
                      <td
                        key={pricingPlans[valueIndex].id}
                        className="px-4 py-4 text-muted-foreground"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  );
}
