# PAY.JP Submission Checklist

Items that must be completed before this site goes live and is submitted for PAY.JP merchant screening.

## Final production corrections

- [ ] 会社法人等番号の表記を確認
- [ ] 公開用電話番号を設定
- [ ] 公開用メールアドレスを設定
- [ ] CONTACT_FORM_ENDPOINTを設定
- [ ] 本番環境でお問い合わせ送信を確認

## Content

- [ ] Real phone number configured (`NEXT_PUBLIC_CONTACT_PHONE`)
- [ ] Real public email configured (`NEXT_PUBLIC_CONTACT_EMAIL`)
- [ ] Production URL configured (`NEXT_PUBLIC_SITE_URL`)
- [x] Terms, legal page, and pricing content are consistent (all three read from `src/config/pricing.ts`)

## Contact form

- [ ] Contact form connected to a secure backend (`CONTACT_FORM_ENDPOINT`) — see `src/app/api/contact/route.ts`

## Payment

- [x] PAY.JP test payment flow implemented (`src/app/api/payments/route.ts`, `src/lib/payjp-server.ts`, `src/lib/payjp-client.ts`, `CheckoutForm.tsx`)
- [x] One-time charges (`online-consultation` 11,000円 / `web-support` 110,000円) verified against the live PAY.JP test API
- [x] Monthly subscription (`business-improvement` 55,000円/月, customer + plan + subscription) verified against the live PAY.JP test API
- [x] Server-side price resolution verified (client-supplied `amount` is ignored; price always comes from `pricing.ts`)
- [x] Production secret (`PAYJP_SECRET_KEY`) confirmed present only in server bundles (verified by grepping `.next/static` build output)
- [x] Secret key confirmed absent from `.next/static` client bundles and from all rendered HTML
- [ ] **Blocked on persistent storage**: `customer.id`/`subscription.id` from the monthly plan are returned in the API response but not stored anywhere — this project has no database. Before production, add a persistent store (e.g. Postgres/Supabase) to save `{ customerId, subscriptionId, planId, name, company, email }` per subscription, so cancellations, dunning, and support lookups are possible.
- [ ] PAY.JP webhook endpoint implemented and signature-verified (charge/subscription status changes, payment failures) — see TODOs in `src/lib/payjp-server.ts` and `src/app/payment/success|cancel/page.tsx`
- [ ] Checkout card-entry flow visually tested in a real browser (this round verified the API layer directly with real tokens; the on-page PAY.JP.js script loading and card form were not visually exercised in a browser)
- [ ] Payment success/failure handling verified against real PAY.JP redirect/webhook results

## Launch verification

- [ ] All pages checked on mobile and desktop in a real browser
- [ ] All links and forms tested against the production deployment
