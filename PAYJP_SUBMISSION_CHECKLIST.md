# PAY.JP Submission Checklist

Items that must be completed before this site goes live and is submitted for PAY.JP merchant screening.

## Content

- [ ] Real phone number configured (`NEXT_PUBLIC_CONTACT_PHONE`)
- [ ] Real public email configured (`NEXT_PUBLIC_CONTACT_EMAIL`)
- [ ] Production URL configured (`NEXT_PUBLIC_SITE_URL`)
- [x] Terms, legal page, and pricing content are consistent (all three read from `src/config/pricing.ts`)

## Contact form

- [ ] Contact form connected to a secure backend (`CONTACT_FORM_ENDPOINT` or equivalent)

## Payment

- [ ] PAY.JP test payment flow implemented
- [ ] PAY.JP test payment verified
- [x] Payment success and failure pages scaffolded (`src/app/payment/success`, `src/app/payment/cancel`)
- [ ] Payment success/failure handling verified against real PAY.JP redirect/webhook results
- [ ] Production secret (`PAYJP_SECRET_KEY`) stored only in environment variables
- [ ] Secret key never exposed to the browser

## Launch verification

- [ ] All pages checked on mobile and desktop in a real browser
- [ ] All links and forms tested against the production deployment
