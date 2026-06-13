# AUTO HEADS 🚗

> **"Where automotive passion meets commerce"**

AUTO HEADS is a social e-gallery marketplace for automotive enthusiasts in Kenya and beyond. Users can showcase vehicles, parts, engines, tires, and projects — and connect with buyers, fans, and collaborators.

---

## Table of Contents

- [Project Identity](#project-identity)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Quick Start (Local Development)](#quick-start-local-development)
- [Environment Variables](#environment-variables)
- [Firebase Setup](#firebase-setup)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Roadmap](#roadmap)

---

## Project Identity

| Field | Value |
|---|---|
| **Owner / Admin** | David Abel |
| **Type** | Social E-Gallery Marketplace |
| **Currency** | KES (Kenya Shillings) |
| **Support Email** | support@autoheads.com |
| **Domain** | TBC — see `docs/SETUP.md` |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v3+ with glassmorphism utilities |
| UI Kit | shadcn/ui |
| Animation | Framer Motion v10+ |
| 3D / Canvas | Three.js (landing page only) |
| Auth | Firebase Auth |
| Database | Cloud Firestore |
| Storage | Firebase Storage |
| Functions | Firebase Cloud Functions (Node.js 18) |
| Payments | Stripe + M-Pesa (Daraja) |
| SMS | Twilio |
| Email | SendGrid |
| Hosting | Vercel (frontend) + Firebase (functions) |
| CDN | Cloudflare |

---

## Repository Structure

```
auto-heads/
├── .github/workflows/        # CI/CD pipelines
├── public/                   # Static assets
├── src/
│   ├── app/                  # Next.js App Router pages & API routes
│   │   ├── (auth)/           # Login, Register, Verify
│   │   ├── (dashboard)/      # Feed, Upload, Profile, Search, Notifications
│   │   ├── (admin)/          # Admin panel (David Abel only)
│   │   └── api/              # API routes
│   ├── components/           # Reusable React components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Business logic, Firebase, payments
│   ├── store/                # Global state (Zustand)
│   ├── types/                # TypeScript interfaces
│   └── middleware.ts         # Route protection (Edge Middleware)
├── functions/                # Firebase Cloud Functions
├── docs/                     # Developer documentation
├── firestore.rules           # Firestore security rules
├── storage.rules             # Firebase Storage rules
├── firebase.json             # Firebase project config
└── vercel.json               # Vercel deployment config
```

---

## Quick Start (Local Development)

### Prerequisites

- Node.js 18+
- Firebase CLI: `npm install -g firebase-tools`
- Vercel CLI: `npm install -g vercel`
- Git

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/[DAVID_USERNAME]/auto-heads.git
cd auto-heads

# 2. Install frontend dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Open .env.local and fill in all values — see docs/SETUP.md

# 4. Install Cloud Functions dependencies
cd functions && npm install && cd ..

# 5. Start Firebase emulators (Auth, Firestore, Storage, Functions)
firebase emulators:start

# 6. In a new terminal — start Next.js dev server
npm run dev

# 7. Open http://localhost:3000
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in all values. **Never commit `.env.local` to GitHub.**

See [Section 5 of the architecture document](docs/ARCHITECTURE.md) for a full description of every variable and where to find its value.

Key variable groups:
- `NEXT_PUBLIC_FIREBASE_*` — Firebase client config
- `FIREBASE_ADMIN_*` — Firebase Admin SDK (server-side only)
- `STRIPE_*` — Stripe payment keys
- `MPESA_*` — Safaricom Daraja API credentials
- `TWILIO_*` — Twilio SMS/voice
- `SENDGRID_*` — SendGrid email

---

## Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable: Authentication (Email/Password, Google, Phone), Firestore (Native mode), Storage
3. Generate a service account key: Project Settings → Service Accounts → Generate new private key
4. Place key values in `.env.local` under `FIREBASE_ADMIN_*`
5. Deploy security rules: `firebase deploy --only firestore:rules,storage`
6. Deploy functions: `firebase deploy --only functions`

See `docs/SETUP.md` for the full step-by-step guide.

---

## Deployment

### Frontend (Vercel)

```bash
vercel --prod
```

Or connect the GitHub repo to Vercel for automatic deployments on push to `main`.

### Cloud Functions (Firebase)

```bash
firebase deploy --only functions
```

### Security Rules

```bash
firebase deploy --only firestore:rules,storage
```

---

## Documentation

| File | Contents |
|---|---|
| `docs/SETUP.md` | Step-by-step local and production setup |
| `docs/ARCHITECTURE.md` | System design, data flow diagrams |
| `docs/FIREBASE_RULES.md` | Explanation of every security rule |
| `docs/PAYMENTS.md` | Stripe + M-Pesa integration guide |
| `docs/ADMIN_GUIDE.md` | How to use the admin panel |
| `docs/HANDOVER.md` | Developer handover checklist |
| `docs/API_REFERENCE.md` | All API routes — method, params, auth |
| `docs/CONTRIBUTING.md` | Coding standards and PR process |

---

## Roadmap

| Week | Focus |
|---|---|
| 1–2 | Foundation: repo, Firebase, Next.js boot, CI/CD |
| 3–4 | Core: Auth, upload, feed, search, likes, comments |
| 5–6 | Interactions: contact modal, Twilio, Stripe, M-Pesa |
| 7 | Admin panel: all management tables + customization |
| 8 | Polish: animations, performance, security audit, launch |

---

## License

Private — all rights reserved. AUTO HEADS © David Abel.
