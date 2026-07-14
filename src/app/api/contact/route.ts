import { NextResponse } from "next/server";

/**
 * CONTACT_FORM_ENDPOINT is intentionally NOT prefixed with NEXT_PUBLIC_, so
 * it is only ever readable here on the server and is never sent to the
 * browser. The client only ever calls this same-origin route.
 */
const CONTACT_FORM_ENDPOINT = process.env.CONTACT_FORM_ENDPOINT;

type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  inquiryType: string;
  service: string;
  message: string;
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
    typeof record.message === "string"
  );
}

export async function POST(request: Request) {
  if (!CONTACT_FORM_ENDPOINT) {
    return NextResponse.json(
      { error: "お問い合わせフォームの送信先が設定されていません。" },
      { status: 503 },
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

  try {
    const upstreamResponse = await fetch(CONTACT_FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!upstreamResponse.ok) {
      return NextResponse.json({ error: "送信に失敗しました。" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "送信に失敗しました。" }, { status: 502 });
  }
}
