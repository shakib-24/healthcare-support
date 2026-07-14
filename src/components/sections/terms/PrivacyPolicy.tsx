import Link from "next/link";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const collectedInfo = [
  "氏名",
  "会社名",
  "メールアドレス",
  "電話番号",
  "お問い合わせ内容",
  "希望サービス",
  "アクセス情報",
];

const purposes = [
  "お問い合わせおよびお申し込みへの対応",
  "本サービスの提供およびご連絡",
  "料金請求および決済手続きに関する対応",
  "サービス改善のための分析",
  "重要なお知らせのご連絡",
];

export default function PrivacyPolicy() {
  return (
    <Section background="muted" id="privacy-policy">
      <Container narrow className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <SectionHeading heading="プライバシーポリシー" />
          <p className="text-sm text-muted-foreground">最終更新日：2026年7月14日</p>
        </div>

        <div className="flex flex-col gap-8">
          <article>
            <h3 className="text-lg font-bold text-foreground">1. 取得する情報</h3>
            <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">
              当社は、本サービスの提供にあたり、以下の情報を取得する場合があります。
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {collectedInfo.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article>
            <h3 className="text-lg font-bold text-foreground">2. 利用目的</h3>
            <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">
              取得した情報は、以下の目的で利用します。
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {purposes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article>
            <h3 className="text-lg font-bold text-foreground">3. 第三者提供</h3>
            <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">
              法令に基づく場合を除き、本人の同意なく個人情報を第三者へ提供しません。ただし、決済、メール送信、システム運用などに必要な範囲で外部事業者へ業務を委託する場合があります。
            </p>
          </article>

          <article>
            <h3 className="text-lg font-bold text-foreground">4. 外部委託</h3>
            <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">
              当社は、利用目的の達成に必要な範囲において、個人情報の取り扱いを外部事業者に委託することがあります。この場合、委託先に対して適切な監督を行います。
            </p>
          </article>

          <article>
            <h3 className="text-lg font-bold text-foreground">5. 安全管理措置</h3>
            <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">
              当社は、取得した個人情報の漏えい、滅失またはき損の防止その他の安全管理のために、必要かつ適切な措置を講じます。
            </p>
          </article>

          <article>
            <h3 className="text-lg font-bold text-foreground">6. Cookie・アクセス解析</h3>
            <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">
              本サービスのWebサイトでは、利用状況の把握やサービス改善を目的として、Cookieおよびアクセス解析ツールを利用する場合があります。Cookieの利用を希望されない場合は、ブラウザの設定により無効にすることができます。
            </p>
          </article>

          <article>
            <h3 className="text-lg font-bold text-foreground">7. 個人情報の開示・訂正・削除</h3>
            <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">
              利用者は、当社が保有する自己の個人情報について、開示、訂正、利用停止または削除を求めることができます。ご希望の場合は、
              <Link href="/contact" className="text-primary underline-offset-4 hover:underline">
                お問い合わせフォーム
              </Link>
              よりご連絡ください。
            </p>
          </article>

          <article>
            <h3 className="text-lg font-bold text-foreground">8. 保存期間</h3>
            <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">
              個人情報は、利用目的の達成に必要な期間、または関連法令に定める期間、適切に保管し、期間経過後は速やかに廃棄または削除します。
            </p>
          </article>

          <article>
            <h3 className="text-lg font-bold text-foreground">9. ポリシーの変更</h3>
            <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">
              当社は、必要に応じて本ポリシーの内容を変更することがあります。変更後の内容は、本ページに掲載した時点から効力を生じるものとします。
            </p>
          </article>

          <article>
            <h3 className="text-lg font-bold text-foreground">10. お問い合わせ窓口</h3>
            <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">
              本ポリシーに関するお問い合わせは、
              <Link href="/contact" className="text-primary underline-offset-4 hover:underline">
                お問い合わせフォーム
              </Link>
              よりご連絡ください。
            </p>
          </article>
        </div>
      </Container>
    </Section>
  );
}
