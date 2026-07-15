import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

/**
 * There is no database in this project. A submission is only ever
 * considered handled once CONTACT_FORM_ENDPOINT accepts it — nothing is
 * persisted locally, so success is never reported without that upstream
 * confirmation.
 *
 * CONTACT_FORM_ENDPOINT is intentionally NOT prefixed with NEXT_PUBLIC_, so
 * it is only ever readable here on the server and is never sent to the
 * browser. The client only ever calls this same-origin route.
 */
const CONTACT_FORM_ENDPOINT = process.env.CONTACT_FORM_ENDPOINT;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_SHORT_FIELD_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  inquiryType: string;
  service: string;
  message: string;
  /** Honeypot: real users never see or fill this field. */
  website?: string;
};

function isContactPayload(value: unknown): value is ContactPayload {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;
  return (
    typeof record.name === "string" &&
    typeof record.company === "string" &&
    typeof record.email === "string" &&
    typeof record.phone === "string" &&
    typeof record.inquiryType === "string" &&
    typeof record.service === "string" &&
    typeof record.message === "string" &&
    (record.website === undefined || typeof record.website === "string")
  );
}

function validate(payload: ContactPayload): string | null {
  if (!payload.name.trim() || payload.name.length > MAX_SHORT_FIELD_LENGTH) {
    return "お名前を正しく入力してください。";
  }
  if (!payload.company.trim() || payload.company.length > MAX_SHORT_FIELD_LENGTH) {
    return "会社名を正しく入力してください。";
  }
  if (
    !EMAIL_PATTERN.test(payload.email.trim()) ||
    payload.email.length > MAX_SHORT_FIELD_LENGTH
  ) {
    return "正しい形式のメールアドレスを入力してください。";
  }
  if (payload.phone.length > MAX_SHORT_FIELD_LENGTH) {
    return "電話番号を正しく入力してください。";
  }
  if (!payload.inquiryType.trim() || payload.inquiryType.length > MAX_SHORT_FIELD_LENGTH) {
    return "お問い合わせ種別を選択してください。";
  }
  if (!payload.service.trim() || payload.service.length > MAX_SHORT_FIELD_LENGTH) {
    return "希望サービスを選択してください。";
  }
  if (!payload.message.trim() || payload.message.length > MAX_MESSAGE_LENGTH) {
    return "お問い合わせ内容を正しく入力してください。";
  }
  return null;
}

// Basic per-process fixed-window rate limiter. This is a first line of
// defense against form spam, not a substitute for a shared store (e.g.
// Redis/Upstash) if this ever runs across multiple serverless instances.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestTimestampsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestTimestampsByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  requestTimestampsByIp.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";
}

export async function POST(request: Request) {
  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { error: "リクエストが多すぎます。時間をおいて再度お試しください。" },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "リクエスト内容を読み取れませんでした。" },
      { status: 400 },
    );
  }

  if (!isContactPayload(payload)) {
    return NextResponse.json({ error: "入力内容が正しくありません。" }, { status: 400 });
  }

  // Honeypot tripped: report success so an automated submitter learns
  // nothing, but never forward it.
  if (payload.website && payload.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const validationError = validate(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  // There is no database to fall back to, so a configured forwarding
  // endpoint is required to accept a submission at all. Without it, tell
  // the caller plainly rather than pretending the submission went anywhere.
  if (!CONTACT_FORM_ENDPOINT) {
    return NextResponse.json(
      {
        error: "現在お問い合わせフォームをご利用いただけません。",
        contactEmail: siteConfig.email,
      },
      { status: 503 },
    );
  }

  try {
    // Never logged: only forwarded, and only after passing validation above.
    const upstreamResponse = await fetch(CONTACT_FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name,
        company: payload.company,
        email: payload.email,
        phone: payload.phone,
        inquiryType: payload.inquiryType,
        service: payload.service,
        message: payload.message,
      }),
    });

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        {
          error: "送信に失敗しました。時間をおいて再度お試しください。",
          contactEmail: siteConfig.email,
        },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      {
        error: "送信に失敗しました。時間をおいて再度お試しください。",
        contactEmail: siteConfig.email,
      },
      { status: 502 },
    );
  }

  // Success is only ever reported once the configured endpoint has
  // confirmed it accepted the submission.
  return NextResponse.json({ ok: true });
}
