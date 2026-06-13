# AUTO HEADS — Payments Guide

## Stripe (Card Payments)

### Flow
1. Frontend calls `POST /api/payments/stripe` with `{ amount, currency }`
2. Server creates PaymentIntent via Stripe SDK
3. Returns `clientSecret` to frontend
4. Stripe Elements renders card form — card data never touches our servers
5. On payment success, Stripe fires webhook to `/api/payments/webhook`
6. Webhook verifies signature with `STRIPE_WEBHOOK_SECRET`
7. On `payment_intent.succeeded`: update Firestore transaction to `completed`

### Test Mode
- Use test card: `4242 4242 4242 4242`, any expiry, any CVC
- Use `stripe listen --forward-to localhost:3000/api/payments/webhook` to test webhooks locally

### Going Live
1. Switch Stripe keys from test (`sk_test_`) to live (`sk_live_`)
2. Update `STRIPE_WEBHOOK_SECRET` with the production webhook secret
3. Ensure `NEXT_PUBLIC_APP_URL` is set to the production domain

---

## M-Pesa (Daraja STK Push)

### Flow
1. Frontend calls `POST /api/payments/mpesa` with `{ phone, amount, reference }`
2. Server calls Daraja `stkpush` API — sends push notification to user's phone
3. User enters M-Pesa PIN on their phone
4. Safaricom fires callback to `MPESA_CALLBACK_URL`
5. Callback handler validates body format + shortcode
6. Updates Firestore transaction to `completed`

### Sandbox Testing
- Use Safaricom Daraja sandbox: https://developer.safaricom.co.ke
- Test phone: `254708374149` (Daraja sandbox test number)
- The STK push won't actually fire on sandbox — simulate via Daraja portal

### Going Live
1. Switch from sandbox URL to production: `https://api.safaricom.co.ke/`
2. Ensure `MPESA_CALLBACK_URL` is HTTPS and publicly accessible
3. Register callback URL in the Daraja portal

---

## Security

- **Stripe**: PCI-DSS compliant — card data never hits our servers
- **Stripe webhooks**: signature verified before any processing
- **M-Pesa callbacks**: validated against expected shortcode and format
- **Amounts**: always validated server-side — client cannot manipulate price
- **Transactions**: write-only from Cloud Functions — Firestore rules deny direct client writes
