import { NextResponse } from "next/server";
import { verifyPayjpWebhookToken } from "@/lib/payjp-server";

/**
 * Minimal PAY.JP webhook scaffold.
 *
 * There is no database in this project, so this route can verify and
 * acknowledge a webhook request but cannot durably act on it. It
 * deliberately does NOT claim to do any of the following, all of which
 * require persistent storage:
 *
 * TODO(database): record `event.id` somewhere durable and check it before
 * processing, so a retried/duplicate delivery from PAY.JP is only applied
 * once. Without that, this route cannot be idempotent — replaying the same
 * event here would replay any effect it triggers.
 * TODO(database): update payment/subscription state (charge succeeded/
 * failed, subscription created/updated/cancelled) against real local
 * records. Without local records there is nothing here to reconcile
 * against — see the TODOs in src/app/api/payments/route.ts.
 *
 * Until a database exists, treat this endpoint as a verified receiver only,
 * not a source of truth for payment or subscription state.
 */
export const runtime = "nodejs";

function safeResponse(status: number, body: Record<string, unknown> = {}) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  if (!process.env.PAYJP_WEBHOOK_SECRET) {
    // Fail closed: with no secret configured there is nothing to verify
    // the request against, so it is never trusted or acted on.
    return safeResponse(503, { error: "webhook not configured" });
  }

  const token = request.headers.get("x-payjp-webhook-token");
  if (!verifyPayjpWebhookToken(token)) {
    return safeResponse(401, { error: "invalid webhook token" });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return safeResponse(400, { error: "malformed payload" });
  }

  if (
    !payload ||
    typeof payload !== "object" ||
    typeof (payload as Record<string, unknown>).type !== "string"
  ) {
    return safeResponse(400, { error: "malformed payload" });
  }

  // Verified and well-formed, but intentionally not processed — see the
  // module-level TODOs. Acknowledged so PAY.JP does not keep retrying.
  return safeResponse(200, { received: true, processed: false });
}
