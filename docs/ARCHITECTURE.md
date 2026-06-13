# AUTO HEADS — Architecture

## System Overview

```
Browser / Mobile
      │
      ▼
Cloudflare (CDN + WAF)
      │
      ▼
Vercel (Next.js 14 App Router)
      │
      ├── Static pages → Edge cached
      ├── Server Components → Firebase Admin SDK
      ├── API Routes → Business logic, webhooks
      └── Edge Middleware → Auth guard (session cookie)
            │
            ▼
      Firebase
      ├── Auth — email/password, Google, phone OTP
      ├── Firestore — document database (6 collections)
      ├── Storage — media files (images, video, docs)
      └── Cloud Functions (Node.js 18)
            ├── onUserCreate — Firestore user doc
            ├── onProjectCreate — confirmation email
            ├── onTransactionComplete — earnings + receipt
            ├── onLike — atomic counter
            ├── getAlgorithmFeed — ranked feed
            └── adminActions — ban/unban
                  │
                  ├── Stripe (card payments, webhooks)
                  ├── M-Pesa Daraja (STK push)
                  ├── Twilio (SMS + voice)
                  └── SendGrid (transactional email)
```

## Data Flow: Upload a Project

1. User fills UploadForm → useUpload() streams file to Firebase Storage
2. createProject() writes Firestore /projects doc
3. Cloud Function onProjectCreate triggers → sends confirmation email
4. Feed subscribers receive real-time update via Firestore onSnapshot

## Data Flow: Buy a Project (Stripe)

1. User selects "Buy" → FinanceModal opens
2. POST /api/payments/stripe → createPaymentIntent(amount)
3. Stripe Elements collects card (PCI-compliant, card never hits our servers)
4. Stripe processes payment → fires webhook to /api/payments/webhook
5. Webhook verified via signature → writes transaction to Firestore
6. Cloud Function onTransactionComplete → updates seller earnings, sends receipts

## Data Flow: Buy a Project (M-Pesa)

1. User selects "M-Pesa" → confirms phone number
2. POST /api/payments/mpesa → stkPush(phone, amount)
3. Safaricom sends STK push to user's phone
4. User enters PIN → Safaricom fires callback to MPESA_CALLBACK_URL
5. Callback handler validates format + shortcode → updates Firestore transaction

## Auth Flow

1. User submits login/register form
2. Firebase Auth REST API exchanges credentials for ID token
3. Server Action creates session cookie: adminAuth.createSessionCookie(idToken)
4. Cookie stored as httpOnly — never exposed to JavaScript
5. Next.js Edge Middleware checks cookie on every protected route request
6. Admin layout Server Component calls requireAdmin() → reads Firestore role field

## Firestore Collections

| Collection | Documents |
|---|---|
| `/users` | One per user — profile, stats, preferences |
| `/projects` | One per project — media, engagement, pricing |
| `/comments` | One per comment — replies embedded as array |
| `/transactions` | One per payment — write-once from server |
| `/interactions` | One per contact event — call, message, etc. |
| `/supporters` | One per supporter — shown in footer |
| `/settings/platform` | Single document — admin customization |
