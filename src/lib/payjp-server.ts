import "server-only";
import { timingSafeEqual } from "node:crypto";

/**
 * Minimal PAY.JP REST API client. Deliberately implemented with `fetch`
 * instead of an SDK so the exact request/response shape — and what never
 * leaves this file — is fully auditable.
 *
 * `import "server-only"` above makes any accidental import of this module
 * from a "use client" component a build-time error, so PAYJP_SECRET_KEY can
 * never end up in a browser bundle.
 */

const PAYJP_API_BASE = "https://api.pay.jp/v1";

export class PayjpConfigError extends Error {}

/** Thrown when PAY.JP accepted the charge request but did not mark it paid. */
export class PayjpChargeNotPaidError extends Error {}

export class PayjpApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "PayjpApiError";
    this.status = status;
    this.code = code;
  }
}

function getSecretKey(): string {
  const key = process.env.PAYJP_SECRET_KEY;
  if (!key) {
    throw new PayjpConfigError("PAYJP_SECRET_KEY is not configured.");
  }
  return key;
}

function authHeader(): string {
  // PAY.JP uses HTTP Basic auth with the secret key as the username and an
  // empty password, like the Stripe-compatible API convention it follows.
  const encoded = Buffer.from(`${getSecretKey()}:`).toString("base64");
  return `Basic ${encoded}`;
}

/**
 * Verifies the `X-Payjp-Webhook-Token` header PAY.JP sends with every
 * webhook request. Unlike Stripe, PAY.JP does not HMAC-sign the payload —
 * it sends a single static, account-specific token (found in the PAY.JP
 * dashboard under Webhook settings) and expects the receiving endpoint to
 * check the header against that stored value. This is the officially
 * documented verification method (https://docs.pay.jp/v1/webhook) as of
 * this integration; there is no request-body signature to validate.
 *
 * Never trust a webhook request whose token does not match.
 */
export function verifyPayjpWebhookToken(headerValue: string | null): boolean {
  const expected = process.env.PAYJP_WEBHOOK_SECRET;
  if (!expected || !headerValue) {
    return false;
  }

  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(headerValue);

  // timingSafeEqual throws on mismatched lengths, so compare lengths first.
  // This leaks only the length of a public-ish token, never the request body.
  if (expectedBuffer.length !== actualBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, actualBuffer);
}

type PayjpErrorBody = {
  error?: { message?: string; code?: string; type?: string; status?: number };
};

function toFormBody(params: Record<string, string | number | undefined>): string {
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      body.set(key, String(value));
    }
  }
  return body.toString();
}

async function payjpPost<T>(
  path: string,
  params: Record<string, string | number | undefined>,
  idempotencyKey?: string,
): Promise<T> {
  const headers: Record<string, string> = {
    Authorization: authHeader(),
    "Content-Type": "application/x-www-form-urlencoded",
  };
  if (idempotencyKey) {
    headers["Idempotency-Key"] = idempotencyKey;
  }

  const response = await fetch(`${PAYJP_API_BASE}${path}`, {
    method: "POST",
    headers,
    body: toFormBody(params),
  });

  const json = (await response.json().catch(() => null)) as (T & PayjpErrorBody) | null;

  if (!response.ok) {
    throw new PayjpApiError(
      json?.error?.message ?? "PAY.JP request failed",
      response.status,
      json?.error?.code,
    );
  }

  return json as T;
}

async function payjpGet<T>(path: string): Promise<T | null> {
  const response = await fetch(`${PAYJP_API_BASE}${path}`, {
    method: "GET",
    headers: { Authorization: authHeader() },
  });

  if (response.status === 404) {
    return null;
  }

  const json = (await response.json().catch(() => null)) as (T & PayjpErrorBody) | null;

  if (!response.ok) {
    throw new PayjpApiError(
      json?.error?.message ?? "PAY.JP request failed",
      response.status,
      json?.error?.code,
    );
  }

  return json as T;
}

export type PayjpCharge = {
  id: string;
  object: "charge";
  paid: boolean;
  amount: number;
  currency: string;
};

/** One-time charge against a single-use card token. */
export async function createCharge(params: {
  token: string;
  amount: number;
  description: string;
  metadata?: Record<string, string>;
  idempotencyKey?: string;
}): Promise<PayjpCharge> {
  const metadataParams = params.metadata
    ? Object.fromEntries(
        Object.entries(params.metadata).map(([key, value]) => [`metadata[${key}]`, value]),
      )
    : {};

  return payjpPost<PayjpCharge>(
    "/charges",
    {
      card: params.token,
      amount: params.amount,
      currency: "jpy",
      description: params.description,
      ...metadataParams,
    },
    params.idempotencyKey,
  );
}

export type PayjpCustomer = {
  id: string;
  object: "customer";
  email?: string;
};

/** Creates a PAY.JP customer with the tokenized card attached, for recurring billing. */
export async function createCustomer(params: {
  token: string;
  email: string;
  description: string;
  idempotencyKey?: string;
}): Promise<PayjpCustomer> {
  return payjpPost<PayjpCustomer>(
    "/customers",
    {
      card: params.token,
      email: params.email,
      description: params.description,
    },
    params.idempotencyKey,
  );
}

export type PayjpPlan = {
  id: string;
  object: "plan";
  amount: number;
  currency: string;
  interval: string;
};

/**
 * Looks up the PAY.JP plan matching our internal plan id, creating it if it
 * doesn't exist yet. Safe to call on every subscription attempt.
 *
 * TODO(PAY.JP本番連携時): interval/billing_dayの挙動は必ず最新のPAY.JP APIドキュメントで
 * 確認すること（日割り計算・請求日の扱いなど、テストモードと異なる場合がある）。
 */
export async function ensureMonthlyPlan(params: {
  planId: string;
  amount: number;
  name: string;
}): Promise<PayjpPlan> {
  const existing = await payjpGet<PayjpPlan>(`/plans/${params.planId}`);
  if (existing) {
    return existing;
  }

  return payjpPost<PayjpPlan>("/plans", {
    id: params.planId,
    amount: params.amount,
    currency: "jpy",
    interval: "month",
    name: params.name,
  });
}

export type PayjpSubscription = {
  id: string;
  object: "subscription";
  status: string;
  customer: string;
};

/** Subscribes an existing customer to an existing plan. */
export async function createSubscription(params: {
  customerId: string;
  planId: string;
  idempotencyKey?: string;
}): Promise<PayjpSubscription> {
  return payjpPost<PayjpSubscription>(
    "/subscriptions",
    {
      customer: params.customerId,
      plan: params.planId,
    },
    params.idempotencyKey,
  );
}

/**
 * Maps a PAY.JP error into a safe, generic Japanese message. Never forwards
 * the raw PAY.JP error message to the client — it may describe internal API
 * details that shouldn't be exposed.
 */
export function translatePayjpError(error: unknown): { status: number; message: string } {
  if (error instanceof PayjpConfigError) {
    return { status: 503, message: "決済機能が現在ご利用いただけません。" };
  }

  if (error instanceof PayjpChargeNotPaidError) {
    return { status: 402, message: "決済が完了しませんでした。カード情報をご確認のうえ、再度お試しください。" };
  }

  if (error instanceof PayjpApiError) {
    switch (error.code) {
      case "card_declined":
        return { status: 402, message: "カードが承認されませんでした。別のカードをお試しください。" };
      case "expired_card":
        return { status: 402, message: "カードの有効期限が切れています。" };
      case "incorrect_cvc":
      case "invalid_cvc":
        return { status: 402, message: "セキュリティコードが正しくありません。" };
      case "invalid_number":
        return { status: 402, message: "カード番号が正しくありません。" };
      default:
        return { status: 402, message: "決済処理に失敗しました。カード情報をご確認のうえ、再度お試しください。" };
    }
  }

  return { status: 500, message: "予期しないエラーが発生しました。時間をおいて再度お試しください。" };
}
