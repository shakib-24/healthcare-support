/**
 * Client-side PAY.JP.js (v2, Elements) helpers. Only ever reads
 * NEXT_PUBLIC_PAYJP_PUBLIC_KEY (safe to expose to the browser) — never
 * import payjp-server.ts from here or from any "use client" file.
 *
 * PAY.JP.js v2's `createToken()` requires a PAY.JP Element (from
 * `payjp.elements()`), not a raw {number, cvc, ...} object — card number,
 * expiry, and CVC are typed directly into PAY.JP-hosted iframes mounted via
 * `PayjpElement.mount()`, so those values never pass through our page's own
 * JS state at all. Only the cardholder name (not a card credential) and the
 * resulting single-use token ever touch our code.
 */

export const PAYJP_SCRIPT_SRC = "https://js.pay.jp/v2/pay.js";

export type PayjpElementType = "cardNumber" | "cardExpiry" | "cardCvc";

export type PayjpElement = {
  mount: (selector: string) => void;
  unmount?: () => void;
  on?: (
    event: "change",
    handler: (e: { error?: { message: string } | null }) => void,
  ) => void;
};

type PayjpElements = {
  create: (type: PayjpElementType, options?: Record<string, unknown>) => PayjpElement;
};

type PayjpTokenResponse = {
  id: string;
  card?: { last4?: string };
};

type PayjpTokenError = {
  error: { message: string; code?: string };
};

type PayjpInstance = {
  elements: (options?: Record<string, unknown>) => PayjpElements;
  createToken: (
    element: PayjpElement,
    params?: Record<string, unknown>,
  ) => Promise<PayjpTokenResponse | PayjpTokenError>;
};

declare global {
  interface Window {
    Payjp?: (publicKey: string) => PayjpInstance;
  }
}

function isTokenError(
  result: PayjpTokenResponse | PayjpTokenError,
): result is PayjpTokenError {
  return "error" in result;
}

export class PayjpTokenizationError extends Error {}

// PAY.JP.js v2's `Payjp(publicKey)` factory throws ("既にインスタンス化され
// ています") if called more than once per page, so the instance must be
// created at most once and reused for the lifetime of the page.
let payjpInstance: PayjpInstance | null = null;

function getPayjpInstance(publicKey: string): PayjpInstance {
  if (!payjpInstance) {
    if (typeof window === "undefined" || !window.Payjp) {
      throw new PayjpTokenizationError(
        "決済モジュールの読み込みが完了していません。しばらくしてから再度お試しください。",
      );
    }
    payjpInstance = window.Payjp(publicKey);
  }
  return payjpInstance;
}

export type MountedCardElements = {
  cardNumberElement: PayjpElement;
  cardExpiryElement: PayjpElement;
  cardCvcElement: PayjpElement;
};

/**
 * Creates and mounts the cardNumber/cardExpiry/cardCvc Elements into the
 * given DOM selectors. Call once each time the payment step is (re)entered.
 */
export function mountPayjpCardElements(selectors: {
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}): MountedCardElements {
  const publicKey = process.env.NEXT_PUBLIC_PAYJP_PUBLIC_KEY;
  if (!publicKey) {
    throw new PayjpTokenizationError("決済機能が現在ご利用いただけません。");
  }

  const payjp = getPayjpInstance(publicKey);
  const elements = payjp.elements();

  const cardNumberElement = elements.create("cardNumber");
  const cardExpiryElement = elements.create("cardExpiry");
  const cardCvcElement = elements.create("cardCvc");

  cardNumberElement.mount(selectors.cardNumber);
  cardExpiryElement.mount(selectors.cardExpiry);
  cardCvcElement.mount(selectors.cardCvc);

  return { cardNumberElement, cardExpiryElement, cardCvcElement };
}

/**
 * Tokenizes the mounted card Elements directly against PAY.JP. The card
 * number/expiry/CVC values live only inside PAY.JP's own iframes and are
 * never read by our code — only the cardholder name (plain text, not a
 * card credential) is passed alongside, and only the resulting single-use
 * token is returned to the caller.
 */
export async function createPayjpToken(
  cardNumberElement: PayjpElement,
  cardholderName: string,
): Promise<string> {
  const publicKey = process.env.NEXT_PUBLIC_PAYJP_PUBLIC_KEY;
  if (!publicKey) {
    throw new PayjpTokenizationError("決済機能が現在ご利用いただけません。");
  }

  const payjp = getPayjpInstance(publicKey);
  const result = await payjp.createToken(cardNumberElement, {
    card: { name: cardholderName },
  });

  if (isTokenError(result)) {
    throw new PayjpTokenizationError(
      result.error.message || "カード情報を確認できませんでした。入力内容をご確認ください。",
    );
  }

  return result.id;
}
