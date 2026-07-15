"use client";

import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import ButtonLink from "@/components/ui/ButtonLink";
import { pricingPlans } from "@/config/pricing";

const inquiryTypeOptions = [
  "サービスについて",
  "料金について",
  "お申し込みについて",
  "日程変更・キャンセル",
  "その他",
];

const serviceOptions = ["特に決まっていない", ...pricingPlans.map((plan) => plan.name)];

type FormValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  inquiryType: string;
  service: string;
  message: string;
  agree: boolean;
  /** Honeypot: left blank by real users, hidden from sighted and screen-reader users alike. */
  website: string;
};

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  inquiryType: inquiryTypeOptions[0],
  service: serviceOptions[0],
  message: "",
  agree: false,
  website: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.name.trim()) {
    errors.name = "お名前を入力してください。";
  }
  if (!values.company.trim()) {
    errors.company = "会社名を入力してください。";
  }
  if (!values.email.trim()) {
    errors.email = "メールアドレスを入力してください。";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "正しい形式のメールアドレスを入力してください。";
  }
  if (!values.message.trim()) {
    errors.message = "お問い合わせ内容を入力してください。";
  }
  if (!values.agree) {
    errors.agree = "個人情報の取り扱いへの同意が必要です。";
  }

  return errors;
}

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

type SubmitErrorInfo = {
  message: string;
  contactEmail?: string;
};

const DEFAULT_SUBMIT_ERROR: SubmitErrorInfo = {
  message: "送信に失敗しました。時間をおいて再度お試しください。",
};

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [submitError, setSubmitError] = useState<SubmitErrorInfo>(DEFAULT_SUBMIT_ERROR);

  const nameId = useId();
  const companyId = useId();
  const emailId = useId();
  const phoneId = useId();
  const inquiryTypeId = useId();
  const serviceId = useId();
  const messageId = useId();
  const agreeId = useId();
  const websiteId = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Guard against duplicate submissions (double-click, repeated Enter).
    if (status === "submitting") {
      return;
    }

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("submitting");

    try {
      // 送信内容にはお申し込みフォームの入力値のみを含み、個人情報は
      // console等にログ出力せず、localStorageにも保存しない。
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          company: values.company,
          email: values.email,
          phone: values.phone,
          inquiryType: values.inquiryType,
          service: values.service,
          message: values.message,
          website: values.website,
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as
          | { error?: string; contactEmail?: string }
          | null;
        setSubmitError({
          message: body?.error ?? DEFAULT_SUBMIT_ERROR.message,
          contactEmail: body?.contactEmail,
        });
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setSubmitError(DEFAULT_SUBMIT_ERROR);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft">
          <CheckCircle2 className="h-5 w-5 text-accent" aria-hidden />
        </span>
        <h3 className="text-lg font-bold text-foreground">送信を受け付けました</h3>
        <p className="text-sm leading-[1.8] text-muted-foreground">
          お問い合わせ内容を受け付けました。内容を確認後、担当者よりご連絡します。
        </p>
        <ButtonLink href="/" variant="outline">
          トップページに戻る
        </ButtonLink>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      {status === "error" ? (
        <p role="alert" className="text-sm text-destructive">
          {submitError.message}
          {submitError.contactEmail ? (
            <>
              {" "}
              お急ぎの場合は
              <a
                href={`mailto:${submitError.contactEmail}`}
                className="text-primary underline-offset-4 hover:underline"
              >
                {submitError.contactEmail}
              </a>
              までご連絡ください。
            </>
          ) : null}
        </p>
      ) : null}

      {/* Honeypot: invisible to sighted users and unreachable by keyboard/AT,
          but present in the DOM for automated form-fillers to trip. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor={websiteId}>Website</label>
        <input
          id={websiteId}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => setValues((prev) => ({ ...prev, website: event.target.value }))}
        />
      </div>

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
          電話番号（任意）
        </label>
        <input
          id={phoneId}
          type="tel"
          value={values.phone}
          onChange={(event) => setValues((prev) => ({ ...prev, phone: event.target.value }))}
          className="w-full min-h-[44px] rounded-[10px] border border-border bg-surface px-4 text-sm text-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={inquiryTypeId} className="text-sm font-semibold text-foreground">
          お問い合わせ種別
        </label>
        <select
          id={inquiryTypeId}
          value={values.inquiryType}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, inquiryType: event.target.value }))
          }
          className="w-full min-h-[44px] rounded-[10px] border border-border bg-surface px-4 text-sm text-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {inquiryTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={serviceId} className="text-sm font-semibold text-foreground">
          希望サービス
        </label>
        <select
          id={serviceId}
          value={values.service}
          onChange={(event) => setValues((prev) => ({ ...prev, service: event.target.value }))}
          className="w-full min-h-[44px] rounded-[10px] border border-border bg-surface px-4 text-sm text-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={messageId} className="text-sm font-semibold text-foreground">
          お問い合わせ内容<span className="ml-1 text-destructive">必須</span>
        </label>
        <textarea
          id={messageId}
          rows={6}
          value={values.message}
          onChange={(event) => setValues((prev) => ({ ...prev, message: event.target.value }))}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${messageId}-error` : undefined}
          className="w-full rounded-[10px] border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
        {errors.message ? (
          <p id={`${messageId}-error`} role="alert" className="text-sm text-destructive">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-3">
          <input
            id={agreeId}
            type="checkbox"
            checked={values.agree}
            onChange={(event) => setValues((prev) => ({ ...prev, agree: event.target.checked }))}
            aria-invalid={errors.agree ? true : undefined}
            aria-describedby={errors.agree ? `${agreeId}-error` : undefined}
            className="mt-1 h-4 w-4 shrink-0 rounded border-border text-primary outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          />
          <label htmlFor={agreeId} className="text-sm leading-[1.8] text-foreground">
            <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
              個人情報の取り扱い
            </Link>
            に同意します
            <span className="ml-1 text-destructive">必須</span>
          </label>
        </div>
        {errors.agree ? (
          <p id={`${agreeId}-error`} role="alert" className="text-sm text-destructive">
            {errors.agree}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-[44px] items-center justify-center gap-2 self-start rounded-[10px] bg-primary px-6 text-sm font-semibold text-primary-foreground outline-none transition-colors duration-200 hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50"
      >
        {status === "submitting" ? "送信中…" : "送信する"}
      </button>
    </form>
  );
}
