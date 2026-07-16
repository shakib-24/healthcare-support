import Link from "next/link";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { pricingPlans } from "@/config/pricing";

const prohibitedItems = [
  "虚偽情報の登録",
  "他者へのなりすまし",
  "不正アクセス",
  "サービス運営の妨害",
  "法令または公序良俗に反する行為",
  "コンテンツの無断転載・複製",
];

export default function TermsOfService() {
  return (
    <Section id="terms-of-service">
      <Container narrow className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <SectionHeading heading="利用規約" />
          <p className="text-sm text-muted-foreground">最終更新日：2026年7月14日</p>
        </div>

        <div className="flex flex-col gap-8">
          <article>
            <h3 className="text-lg font-bold text-foreground">第1条（適用）</h3>
            <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">
              本規約は、株式会社ブランチ（以下「当社」といいます）が提供するBranch Healthcare
              Support（以下「本サービス」といいます）の利用条件を定めるものです。本サービスをお申し込みいただいたお客様（以下「利用者」といいます）は、本規約に同意のうえ本サービスをご利用いただきます。
            </p>
          </article>

          <article>
            <h3 className="text-lg font-bold text-foreground">第2条（サービス内容）</h3>
            <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">
              本サービスは、医療・介護・ヘルスケア関連の法人および事業者を対象とした業務改善・Web活用支援サービスです。個人の診断、治療、投薬、健康相談その他の医療行為は提供しません。
            </p>
            <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">
              サービスの詳細および料金については、
              <Link href="/service" className="text-primary underline-offset-4 hover:underline">
                サービスページ
              </Link>
              に定めるとおりとします。
            </p>
          </article>

          <article>
            <h3 className="text-lg font-bold text-foreground">第3条（利用申し込み）</h3>
            <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">
              本サービスの利用を希望する方は、当社所定のお申し込みフォームより必要事項を入力し、料金のお支払いを完了することで申し込みが成立するものとします。当社が申し込み内容に不備または不適切な点があると判断した場合、申し込みをお断りすることがあります。
            </p>
          </article>

          <article>
            <h3 className="text-lg font-bold text-foreground">第4条（料金および支払方法）</h3>
            <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">
              本サービスの利用料金は、サービスページに表示する金額（消費税込み）とします。お支払いはクレジットカード決済によるものとし、料金のお支払時期は各プランに定めるとおりとします。
            </p>
          </article>

          <article>
            <h3 className="text-lg font-bold text-foreground">第5条（サービス提供）</h3>
            <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">
              当社は、お申し込み内容の確認後、各プランに定める時期を目安にサービスを提供します。サービスはオンラインでの面談を基本として提供します。
            </p>
          </article>

          <article>
            <h3 className="text-lg font-bold text-foreground">第6条（禁止事項）</h3>
            <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">
              利用者は、本サービスの利用にあたり、以下の行為を行ってはなりません。
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {prohibitedItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article>
            <h3 className="text-lg font-bold text-foreground">第7条（キャンセル・解約）</h3>
            <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">
              各プランのキャンセルおよび解約条件は、次のとおりとします。
            </p>
            <ul className="mt-3 flex flex-col gap-4">
              {pricingPlans.map((plan) => (
                <li key={plan.id} className="text-sm leading-[1.8] text-muted-foreground">
                  <span className="font-semibold text-foreground">{plan.name}：</span>
                  {plan.cancellation}
                </li>
              ))}
            </ul>
          </article>

          <article>
            <h3 className="text-lg font-bold text-foreground">第8条（知的財産権）</h3>
            <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">
              本サービスに関連して当社が提供する資料、テキストその他のコンテンツに関する著作権その他の知的財産権は、当社または正当な権利を有する第三者に帰属します。利用者は、当社の事前の許可なく、これらを複製、転載、改変または二次利用してはなりません。
            </p>
          </article>

          <article>
            <h3 className="text-lg font-bold text-foreground">第9条（サービスの変更・停止）</h3>
            <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">
              当社は、利用者への事前の通知をもって、本サービスの内容を変更し、または提供を停止もしくは中断することがあります。これにより利用者に生じた損害について、当社に故意または重過失がある場合を除き、当社は責任を負いません。
            </p>
          </article>

          <article>
            <h3 className="text-lg font-bold text-foreground">第10条（免責事項）</h3>
            <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">
              当社は、善良な管理者の注意をもって本サービスを提供しますが、提案内容の実施結果や成果を保証するものではありません。天災地変、通信回線の障害その他当社の責に帰さない事由により利用者に生じた損害について、当社は責任を負いません。
            </p>
          </article>

          <article>
            <h3 className="text-lg font-bold text-foreground">第11条（規約の変更）</h3>
            <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">
              当社は、必要と判断した場合、利用者への事前の通知をもって本規約を変更できるものとします。変更後の規約は、本ページに掲載した時点から効力を生じるものとします。
            </p>
          </article>

          <article>
            <h3 className="text-lg font-bold text-foreground">第12条（準拠法・管轄裁判所）</h3>
            <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">
              本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して当社と利用者との間で紛争が生じた場合には、横浜地方裁判所を第一審の専属的合意管轄裁判所とします。
            </p>
          </article>
        </div>
      </Container>
    </Section>
  );
}
