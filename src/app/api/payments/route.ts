import { NextResponse } from "next/server";
import { pricingPlans, type PricingPlan } from "@/config/pricing";
import {
  createCharge,
  createCustomer,
  createSubscription,
  ensureMonthlyPlan,
  PayjpChargeNotPaidError,
  translatePayjpError,
} from "@/lib/payjp-server";

/**
 * Accepts only a PAY.JP token, planId, and applicant identity — never a
 * client-supplied amount. The charge/subscription amount is always resolved
 * from src/config/pricing.ts on the server.
 */
type PaymentRequestBody = {
  token: string;
  planId: string;
  name: string;
  company: string;
  email: string;
  idempotencyKey?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// PAY.JP single-use card tokens always start with this prefix.
const TOKEN_PATTERN = /^tok_[a-zA-Z0-9]+$/;

function isPaymentRequestBody(value: unknown): value is PaymentRequestBody {
  if (!value || typeof value !== "object") {
    return false;
  }
  const record = value as Record<string, unknown>;
  return (
    typeof record.token === "string" &&
    typeof record.planId === "string" &&
    typeof record.name === "string" &&
    typeof record.company === "string" &&
    typeof record.email === "string" &&
    (record.idempotencyKey === undefined || typeof record.idempotencyKey === "string")
  );
}

function errorResponse(status: number, message: string) {
  return NextResponse.json({ error: message }, { status });
}

async function chargeOneTimePlan(
  plan: PricingPlan,
  body: PaymentRequestBody,
): Promise<{ ok: true; chargeId: string }> {
  const charge = await createCharge({
    token: body.token,
    amount: plan.priceValue,
    description: `${plan.name}（${body.company} 様）`,
    metadata: {
      planId: plan.id,
      applicantName: body.name,
      applicantCompany: body.company,
    },
    idempotencyKey: body.idempotencyKey,
  });

  if (!charge.paid) {
    throw new PayjpChargeNotPaidError("Charge was not confirmed as paid.");
  }

  return { ok: true, chargeId: charge.id };
}

async function subscribeMonthlyPlan(
  plan: PricingPlan,
  body: PaymentRequestBody,
): Promise<{ ok: true; customerId: string; subscriptionId: string }> {
  const customer = await createCustomer({
    token: body.token,
    email: body.email,
    description: `${plan.name}（${body.company} 様 / ${body.name} 様）`,
    idempotencyKey: body.idempotencyKey,
  });

  const monthlyPlan = await ensureMonthlyPlan({
    planId: plan.id,
    amount: plan.priceValue,
    name: plan.name,
  });

  const subscription = await createSubscription({
    customerId: customer.id,
    planId: monthlyPlan.id,
    idempotencyKey: body.idempotencyKey ? `${body.idempotencyKey}-sub` : undefined,
  });

  // TODO(本番連携前に必須): このプロジェクトには永続データベースがない。
  // customer.id と subscription.id をどこにも保存していないため、後から
  // 「誰のサブスクリプションか」を照会・解約・請求失敗時のリトライ管理が
  // できない。本番投入前に、これらのIDと申込者情報（name/company/email/
  // planId）を永続ストア（例: Postgres, Supabase等）に保存する処理を追加し、
  // PAY.JPのWebhook（例: 支払い失敗、解約）と突き合わせられるようにすること。
  return { ok: true, customerId: customer.id, subscriptionId: subscription.id };
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return errorResponse(400, "リクエスト内容を読み取れませんでした。");
  }

  if (!isPaymentRequestBody(payload)) {
    return errorResponse(400, "入力内容が正しくありません。");
  }

  const body = payload;

  if (!TOKEN_PATTERN.test(body.token)) {
    return errorResponse(400, "カード情報のトークンが正しくありません。");
  }
  if (!body.name.trim() || !body.company.trim()) {
    return errorResponse(400, "お名前と会社名を入力してください。");
  }
  if (!EMAIL_PATTERN.test(body.email.trim())) {
    return errorResponse(400, "正しい形式のメールアドレスを入力してください。");
  }

  const plan = pricingPlans.find((candidate) => candidate.id === body.planId);
  if (!plan) {
    return errorResponse(400, "指定されたプランが見つかりませんでした。");
  }

  try {
    const result =
      plan.id === "business-improvement"
        ? await subscribeMonthlyPlan(plan, body)
        : await chargeOneTimePlan(plan, body);

    return NextResponse.json(result);
  } catch (error) {
    // Never log card data, tokens, secret keys, or personal information.
    // Only the plan id and a translated, non-sensitive error are recorded.
    const { status, message } = translatePayjpError(error);
    return errorResponse(status, message);
  }
}
