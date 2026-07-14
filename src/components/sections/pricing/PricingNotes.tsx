import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  additionalFeesNotice,
  paymentMethodNotice,
  paymentTimingNotice,
  receiptNotice,
} from "@/config/legal";

const notes = [
  {
    title: "表示価格",
    body: "すべての料金は消費税込みです。",
  },
  {
    title: "お支払方法",
    body: paymentMethodNotice,
  },
  {
    title: "商品代金以外に必要な料金",
    body: additionalFeesNotice,
  },
  {
    title: "支払時期",
    body: paymentTimingNotice,
  },
  {
    title: "領収書",
    body: receiptNotice,
  },
];

export default function PricingNotes() {
  return (
    <Section background="muted">
      <Container narrow className="flex flex-col gap-8">
        <SectionHeading heading="料金・お支払いについて" />
        <dl className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-surface">
          {notes.map((note) => (
            <div key={note.title} className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:gap-8">
              <dt className="w-40 shrink-0 text-sm font-semibold text-foreground">{note.title}</dt>
              <dd className="text-sm leading-[1.8] text-muted-foreground">{note.body}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
