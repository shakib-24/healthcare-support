"use client";

import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { ShieldCheck } from "lucide-react";
import Card from "@/components/ui/Card";
import type { PricingPlan } from "@/config/pricing";
import {
  createPayjpToken,
  mountPayjpCardElements,
  PAYJP_SCRIPT_SRC,
  PayjpTokenizationError,
  type PayjpElement,
} from "@/lib/payjp-client";

type ApplicantValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  preferredTiming: string;
  notes: string;
  agreeTerms: boolean;
  agreeLegal: boolean;
  agreeCancellation: boolean;
};

type FieldErrors = Partial<Record<keyof ApplicantValues, string>>;

const initialValues: ApplicantValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  preferredTiming: "",
  notes: "",
  agreeTerms: false,
  agreeLegal: false,
  agreeCancellation: false,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: ApplicantValues): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.name.trim()) errors.name = "お名前を入力してください。";
  if (!values.company.trim()) errors.company = "会社名を入力してください。";
  if (!values.email.trim()) {
    errors.email = "メールアドレスを入力してください。";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "正しい形式のメールアドレスを入力してください。";
  }
  if (!values.phone.trim()) errors.phone = "電話番号を入力してください。";
  if (!values.preferredTiming.trim()) {
    errors.preferredTiming = "希望日または希望時期を入力してください。";
  }
  if (!values.agreeTerms) errors.agreeTerms = "利用規約への同意が必要です。";
  if (!values.agreeLegal) errors.agreeLegal = "特定商取引法に基づく表記のご確認が必要です。";
  if (!values.agreeCancellation) errors.agreeCancellation = "キャンセル条件への同意が必要です。";

  return errors;
}

// Card number/expiry/CVC are collected by PAY.JP's own mounted Elements
// (iframes), not by our React state — only the cardholder name is ours.
const CARD_NUMBER_SELECTOR = "#payjp-card-number-element";
const CARD_EXPIRY_SELECTOR = "#payjp-card-expiry-element";
const CARD_CVC_SELECTOR = "#payjp-card-cvc-element";

type ElementErrors = {
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
};

type CheckoutFormProps = {
  plan: PricingPlan;
};

export default function CheckoutForm({ plan }: CheckoutFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "confirm" | "payment">("form");

  const [values, setValues] = useState<ApplicantValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});

  const [cardName, setCardName] = useState("");
  const [cardNameError, setCardNameError] = useState<string | null>(null);
  const [elementErrors, setElementErrors] = useState<ElementErrors>({});
  const [payjpReady, setPayjpReady] = useState(false);
  const [elementsMounted, setElementsMounted] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const cardNumberElementRef = useRef<PayjpElement | null>(null);
  const elementsMountedOnceRef = useRef(false);

  // Stable per checkout attempt so a retried click reuses the same
  // idempotency key instead of risking a duplicate charge.
  const idempotencyKey = useMemo(() => crypto.randomUUID(), []);

  const nameId = useId();
  const companyId = useId();
  const emailId = useId();
  const phoneId = useId();
  const timingId = useId();
  const notesId = useId();
  const agreeTermsId = useId();
  const agreeLegalId = useId();
  const agreeCancellationId = useId();

  const cardNameId = useId();

  // Mount the PAY.JP card Elements once, as soon as the payment step is
  // showing and the SDK script has loaded. Elements can only be mounted
  // into DOM nodes that exist, so this must run after this step renders.
  useEffect(() => {
    if (step !== "payment" || !payjpReady || elementsMountedOnceRef.current) {
      return;
    }
    elementsMountedOnceRef.current = true;

    // Mounting Elements is an imperative call to an external SDK; the
    // resulting state updates are deferred to a microtask (a callback, not
    // the synchronous effect body) per React's effect purity rules.
    queueMicrotask(() => {
      try {
        const { cardNumberElement, cardExpiryElement, cardCvcElement } = mountPayjpCardElements({
          cardNumber: CARD_NUMBER_SELECTOR,
          cardExpiry: CARD_EXPIRY_SELECTOR,
          cardCvc: CARD_CVC_SELECTOR,
        });
        cardNumberElementRef.current = cardNumberElement;

        cardNumberElement.on?.("change", (e) => {
          setElementErrors((prev) => ({ ...prev, cardNumber: e.error?.message }));
        });
        cardExpiryElement.on?.("change", (e) => {
          setElementErrors((prev) => ({ ...prev, cardExpiry: e.error?.message }));
        });
        cardCvcElement.on?.("change", (e) => {
          setElementErrors((prev) => ({ ...prev, cardCvc: e.error?.message }));
        });

        setElementsMounted(true);
      } catch (error) {
        setPaymentStatus("error");
        setPaymentError(
          error instanceof PayjpTokenizationError
            ? error.message
            : "決済モジュールの読み込みに失敗しました。時間をおいて再度お試しください。",
        );
      }
    });
  }, [step, payjpReady]);

  function handleReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStep("confirm");
  }

  function handleEdit() {
    setStep("form");
  }

  function handleProceedToPayment() {
    setPaymentStatus("idle");
    setPaymentError(null);
    setStep("payment");
  }

  async function handlePay(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Prevent duplicate submission while a request is already in flight.
    if (paymentStatus === "submitting") {
      return;
    }

    const trimmedCardName = cardName.trim();
    if (!trimmedCardName) {
      setCardNameError("カード名義人を入力してください。");
      return;
    }
    setCardNameError(null);

    if (!cardNumberElementRef.current) {
      setPaymentStatus("error");
      setPaymentError("決済モジュールの読み込みが完了していません。しばらくしてから再度お試しください。");
      return;
    }

    setPaymentStatus("submitting");
    setPaymentError(null);

    try {
      // Card number/expiry/CVC live only inside PAY.JP's own mounted
      // iframes and are tokenized directly by PAY.JP. Only the resulting
      // single-use token is ever sent to our own server below.
      const token = await createPayjpToken(cardNumberElementRef.current, trimmedCardName);

      const response = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          planId: plan.id,
          name: values.name,
          company: values.company,
          email: values.email,
          idempotencyKey,
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok: true }
        | { error: string }
        | null;

      if (!response.ok || !result || !("ok" in result) || !result.ok) {
        const message =
          result && "error" in result && result.error
            ? result.error
            : "決済処理に失敗しました。時間をおいて再度お試しください。";
        setPaymentStatus("error");
        setPaymentError(message);
        return;
      }

      // Only navigate to the success page after a confirmed successful
      // charge/subscription — never show success optimistically.
      router.push("/payment/success");
    } catch (error) {
      setPaymentStatus("error");
      setPaymentError(
        error instanceof PayjpTokenizationError
          ? error.message
          : "決済処理に失敗しました。時間をおいて再度お試しください。",
      );
    }
  }

  if (step === "payment") {
    return (
      <Card className="flex flex-col gap-6">
        <Script src={PAYJP_SCRIPT_SRC} strategy="afterInteractive" onLoad={() => setPayjpReady(true)} />

        <h2 className="text-xl font-bold text-foreground">お支払い情報の入力</h2>

        <div className="flex items-start gap-3 rounded-xl border border-border bg-surface-muted px-4 py-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
          <p className="text-sm leading-[1.8] text-foreground">
            カード情報はPAY.JPへ直接送信され、当サイトのサーバーに保存されることはありません。
          </p>
        </div>

        <form noValidate onSubmit={handlePay} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-foreground">
              カード番号<span className="ml-1 text-destructive">必須</span>
            </span>
            <div
              id="payjp-card-number-element"
              className="min-h-[44px] rounded-[10px] border border-border bg-surface px-4 py-2.5"
            />
            {elementErrors.cardNumber ? (
              <p role="alert" className="text-sm text-destructive">
                {elementErrors.cardNumber}
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-foreground">
                有効期限<span className="ml-1 text-destructive">必須</span>
              </span>
              <div
                id="payjp-card-expiry-element"
                className="min-h-[44px] rounded-[10px] border border-border bg-surface px-4 py-2.5"
              />
              {elementErrors.cardExpiry ? (
                <p role="alert" className="text-sm text-destructive">
                  {elementErrors.cardExpiry}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-foreground">
                セキュリティコード<span className="ml-1 text-destructive">必須</span>
              </span>
              <div
                id="payjp-card-cvc-element"
                className="min-h-[44px] rounded-[10px] border border-border bg-surface px-4 py-2.5"
              />
              {elementErrors.cardCvc ? (
                <p role="alert" className="text-sm text-destructive">
                  {elementErrors.cardCvc}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor={cardNameId} className="text-sm font-semibold text-foreground">
              カード名義人<span className="ml-1 text-destructive">必須</span>
            </label>
            <input
              id={cardNameId}
              type="text"
              autoComplete="cc-name"
              placeholder="TARO PAY"
              value={cardName}
              onChange={(event) => setCardName(event.target.value)}
              aria-invalid={cardNameError ? true : undefined}
              aria-describedby={cardNameError ? `${cardNameId}-error` : undefined}
              className="w-full min-h-[44px] rounded-[10px] border border-border bg-surface px-4 text-sm text-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            />
            {cardNameError ? (
              <p id={`${cardNameId}-error`} role="alert" className="text-sm text-destructive">
                {cardNameError}
              </p>
            ) : null}
          </div>

          {paymentStatus === "error" && paymentError ? (
            <p role="alert" className="text-sm text-destructive">
              {paymentError}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => setStep("confirm")}
              disabled={paymentStatus === "submitting"}
              className="inline-flex min-h-[44px] items-center justify-center rounded-[10px] border border-border bg-surface px-6 text-sm font-semibold text-foreground outline-none transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50"
            >
              戻る
            </button>
            <button
              type="submit"
              disabled={!payjpReady || !elementsMounted || paymentStatus === "submitting"}
              className="inline-flex min-h-[44px] items-center justify-center rounded-[10px] bg-primary px-6 text-sm font-semibold text-primary-foreground outline-none transition-colors duration-200 hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50"
            >
              {paymentStatus === "submitting"
                ? "決済処理中…"
                : !payjpReady || !elementsMounted
                  ? "決済モジュールを読み込み中…"
                  : "支払う"}
            </button>
          </div>
        </form>
      </Card>
    );
  }

  if (step === "confirm") {
    return (
      <Card className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-foreground">お申し込み内容の最終確認</h2>

        <dl className="flex flex-col divide-y divide-border rounded-xl border border-border">
          {(
            [
              ["プラン", plan.name],
              ["お名前", values.name],
              ["会社名", values.company],
              ["メールアドレス", values.email],
              ["電話番号", values.phone],
              ["希望日または希望時期", values.preferredTiming],
              ["連絡事項", values.notes || "（入力なし）"],
            ] as const
          ).map(([label, value]) => (
            <div key={label} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:gap-6">
              <dt className="w-40 shrink-0 text-sm font-semibold text-foreground">{label}</dt>
              <dd className="text-sm leading-[1.8] text-muted-foreground">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="rounded-xl border border-border bg-surface-muted px-4 py-3 text-sm leading-[1.8] text-foreground">
          お支払方法：クレジットカード決済
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={handleEdit}
            className="inline-flex min-h-[44px] items-center justify-center rounded-[10px] border border-border bg-surface px-6 text-sm font-semibold text-foreground outline-none transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            内容を修正する
          </button>
          <button
            type="button"
            onClick={handleProceedToPayment}
            className="inline-flex min-h-[44px] items-center justify-center rounded-[10px] bg-primary px-6 text-sm font-semibold text-primary-foreground outline-none transition-colors duration-200 hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            お支払い情報を入力する
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <form noValidate onSubmit={handleReview} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-foreground">お申し込み情報の入力</h2>

        <div className="flex flex-col gap-2">
          <label htmlFor={nameId} className="text-sm font-semibold text-foreground">
            お名前<span className="ml-1 text-destructive">必須</span>
          </label>
          <input
            id={nameId}
            type="text"
            value={values.name}
            onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${nameId}-error` : undefined}
            className="w-full min-h-[44px] rounded-[10px] border border-border bg-surface px-4 text-sm text-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          />
          {errors.name ? (
            <p id={`${nameId}-error`} role="alert" className="text-sm text-destructive">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={companyId} className="text-sm font-semibold text-foreground">
            会社名<span className="ml-1 text-destructive">必須</span>
          </label>
          <input
            id={companyId}
            type="text"
            value={values.company}
            onChange={(event) => setValues((prev) => ({ ...prev, company: event.target.value }))}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={errors.company ? `${companyId}-error` : undefined}
            className="w-full min-h-[44px] rounded-[10px] border border-border bg-surface px-4 text-sm text-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          />
          {errors.company ? (
            <p id={`${companyId}-error`} role="alert" className="text-sm text-destructive">
              {errors.company}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={emailId} className="text-sm font-semibold text-foreground">
            メールアドレス<span className="ml-1 text-destructive">必須</span>
          </label>
          <input
            id={emailId}
            type="email"
            value={values.email}
            onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${emailId}-error` : undefined}
            className="w-full min-h-[44px] rounded-[10px] border border-border bg-surface px-4 text-sm text-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          />
          {errors.email ? (
            <p id={`${emailId}-error`} role="alert" className="text-sm text-destructive">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={phoneId} className="text-sm font-semibold text-foreground">
            電話番号<span className="ml-1 text-destructive">必須</span>
          </label>
          <input
            id={phoneId}
            type="tel"
            value={values.phone}
            onChange={(event) => setValues((prev) => ({ ...prev, phone: event.target.value }))}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? `${phoneId}-error` : undefined}
            className="w-full min-h-[44px] rounded-[10px] border border-border bg-surface px-4 text-sm text-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          />
          {errors.phone ? (
            <p id={`${phoneId}-error`} role="alert" className="text-sm text-destructive">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={timingId} className="text-sm font-semibold text-foreground">
            希望日または希望時期<span className="ml-1 text-destructive">必須</span>
          </label>
          <input
            id={timingId}
            type="text"
            placeholder="例：来週以降の平日午後"
            value={values.preferredTiming}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, preferredTiming: event.target.value }))
            }
            aria-invalid={errors.preferredTiming ? true : undefined}
            aria-describedby={errors.preferredTiming ? `${timingId}-error` : undefined}
            className="w-full min-h-[44px] rounded-[10px] border border-border bg-surface px-4 text-sm text-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          />
          {errors.preferredTiming ? (
            <p id={`${timingId}-error`} role="alert" className="text-sm text-destructive">
              {errors.preferredTiming}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={notesId} className="text-sm font-semibold text-foreground">
            連絡事項（任意）
          </label>
          <textarea
            id={notesId}
            rows={4}
            value={values.notes}
            onChange={(event) => setValues((prev) => ({ ...prev, notes: event.target.value }))}
            className="w-full rounded-[10px] border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          />
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <input
                id={agreeTermsId}
                type="checkbox"
                checked={values.agreeTerms}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, agreeTerms: event.target.checked }))
                }
                aria-invalid={errors.agreeTerms ? true : undefined}
                aria-describedby={errors.agreeTerms ? `${agreeTermsId}-error` : undefined}
                className="mt-1 h-4 w-4 shrink-0 rounded border-border text-primary outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              />
              <label htmlFor={agreeTermsId} className="text-sm leading-[1.8] text-foreground">
                <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
                  利用規約
                </Link>
                に同意します
                <span className="ml-1 text-destructive">必須</span>
              </label>
            </div>
            {errors.agreeTerms ? (
              <p id={`${agreeTermsId}-error`} role="alert" className="text-sm text-destructive">
                {errors.agreeTerms}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <input
                id={agreeLegalId}
                type="checkbox"
                checked={values.agreeLegal}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, agreeLegal: event.target.checked }))
                }
                aria-invalid={errors.agreeLegal ? true : undefined}
                aria-describedby={errors.agreeLegal ? `${agreeLegalId}-error` : undefined}
                className="mt-1 h-4 w-4 shrink-0 rounded border-border text-primary outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              />
              <label htmlFor={agreeLegalId} className="text-sm leading-[1.8] text-foreground">
                <Link href="/legal" className="text-primary underline-offset-4 hover:underline">
                  特定商取引法に基づく表記
                </Link>
                を確認しました
                <span className="ml-1 text-destructive">必須</span>
              </label>
            </div>
            {errors.agreeLegal ? (
              <p id={`${agreeLegalId}-error`} role="alert" className="text-sm text-destructive">
                {errors.agreeLegal}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <input
                id={agreeCancellationId}
                type="checkbox"
                checked={values.agreeCancellation}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, agreeCancellation: event.target.checked }))
                }
                aria-invalid={errors.agreeCancellation ? true : undefined}
                aria-describedby={
                  errors.agreeCancellation ? `${agreeCancellationId}-error` : undefined
                }
                className="mt-1 h-4 w-4 shrink-0 rounded border-border text-primary outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              />
              <label
                htmlFor={agreeCancellationId}
                className="text-sm leading-[1.8] text-foreground"
              >
                本プランのキャンセル条件に同意します
                <span className="ml-1 text-destructive">必須</span>
              </label>
            </div>
            {errors.agreeCancellation ? (
              <p
                id={`${agreeCancellationId}-error`}
                role="alert"
                className="text-sm text-destructive"
              >
                {errors.agreeCancellation}
              </p>
            ) : null}
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex min-h-[44px] items-center justify-center self-start rounded-[10px] bg-primary px-6 text-sm font-semibold text-primary-foreground outline-none transition-colors duration-200 hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          お申し込み内容を確認する
        </button>
      </form>
    </Card>
  );
}
