import { ArrowRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ButtonLink from "@/components/ui/ButtonLink";
import { siteConfig } from "@/config/site";

const facts = [
  { label: "会社名", value: siteConfig.companyName },
  { label: "代表者", value: siteConfig.representative },
  { label: "設立", value: siteConfig.established },
  { label: "所在地", value: `${siteConfig.postalCode} ${siteConfig.address}` },
];

export default function CompanySection() {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow="ABOUT US" heading="株式会社ブランチについて" />
            <div className="flex flex-col gap-4 text-base leading-[1.8] text-muted-foreground">
              <p>
                株式会社ブランチは、医療・介護・ヘルスケア分野に関わる事業者様を対象に、業務改善、Web活用、組織づくりに関する支援を提供しています。
              </p>
              <p>
                現場の状況や課題を丁寧に整理し、事業者様とともに実行できる改善方法を考えることを大切にしています。
              </p>
            </div>
            <ButtonLink href="/legal" variant="text" icon={ArrowRight} className="self-start">
              特定商取引法に基づく表記
            </ButtonLink>
          </div>
          <dl className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-surface">
            {facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:gap-6">
                <dt className="w-24 shrink-0 text-sm font-semibold text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="text-sm leading-[1.8] text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
