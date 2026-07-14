import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { pricingPlans } from "@/config/pricing";

export default function LegalPricingTable() {
  return (
    <Section background="muted">
      <Container narrow className="flex flex-col gap-8">
        <SectionHeading heading="プランごとの価格" />
        <p className="text-sm text-muted-foreground sm:hidden">
          表を左右にスクロールしてご確認いただけます。
        </p>
        <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <caption className="sr-only">プランごとの価格・お支払方法一覧</caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="px-4 py-4 text-left font-semibold text-foreground">
                  プラン名
                </th>
                <th scope="col" className="px-4 py-4 text-left font-semibold text-foreground">
                  価格（税込）
                </th>
                <th scope="col" className="px-4 py-4 text-left font-semibold text-foreground">
                  お支払方法
                </th>
              </tr>
            </thead>
            <tbody>
              {pricingPlans.map((plan, index) => (
                <tr
                  key={plan.id}
                  className={index % 2 === 1 ? "bg-background" : "bg-surface"}
                >
                  <th scope="row" className="px-4 py-4 text-left font-medium text-foreground">
                    {plan.name}
                  </th>
                  <td className="px-4 py-4 text-muted-foreground">{plan.price}</td>
                  <td className="px-4 py-4 text-muted-foreground">{plan.billingType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  );
}
