# AUTO HEADS — Setup Guide

Complete step-by-step guide for setting up the AUTO HEADS platform locally and in production.

---

## Prerequisites

| Tool | Version | Install |
|---|---|---|
| Node.js | 18+ | https://nodejs.org |
| Git | latest | https://git-scm.com |
| Firebase CLI | latest | `npm install -g firebase-tools` |
| Vercel CLI | latest | `npm install -g vercel` |

---

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/[DAVID_USERNAME]/auto-heads.git
cd auto-heads
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in all values. See the Environment Variables section of the architecture document for where to find each value.

### 4. Set up Firebase

```bash
firebase login
firebase use autoheads-prod
```

### 5. Install Cloud Functions dependencies

```bash
cd functions && npm install && cd ..
```

### 6. Start Firebase emulators

```bash
firebase emulators:start
```

This starts: Auth (port 9099), Firestore (port 8080), Storage (port 9199), Functions (port 5001), UI (port 4000).

### 7. Start the Next.js dev server

In a new terminal:

```bash
npm run dev
```

Open http://localhost:3000.

---

## Firebase Project Setup (First Time)

1. Go to https://console.firebase.google.com
2. Create a project named `autoheads-prod`
3. Enable **Authentication**: Email/Password, Google, Phone
4. Enable **Firestore Database**: Native mode, region: `europe-west1` (or nearest to Kenya)
5. Enable **Storage**: Default bucket
6. Deploy security rules: `firebase deploy --only firestore:rules,storage`
7. Generate service account: Project Settings → Service Accounts → Generate new private key

---

## Production Deployment

### Deploy frontend to Vercel

```bash
vercel --prod
```

Or connect GitHub repo to Vercel for automatic deploys on push to `main`.

Add all `.env.local` variables in Vercel: Dashboard → Project → Settings → Environment Variables.

### Deploy Cloud Functions

```bash
firebase deploy --only functions
```

### Deploy Firestore Rules and Indexes

```bash
firebase deploy --only firestore
```

---

## Secrets Setup (Vercel)

All variables from `.env.example` must be added to Vercel manually. Vercel does not read `.env.local` in production.

Go to: Vercel → Project → Settings → Environment Variables → Add each key.

---

## Adding the First Admin User

1. Register a normal account via the app
2. Go to Firebase Console → Firestore → users → [your uid]
3. Edit the `role` field: change `"user"` to `"admin"`
4. Refresh the app — `/admin` routes are now accessible

---

## Open Clarifications (Action Required Before Development)

See Section 14 of the architecture document for the full list. Key items:

1. **Production domain** — confirm autoheads.co.ke or autoheads.com
2. **Firebase Project ID** — must be agreed before starting
3. **Stripe account** — personal or company?
4. **M-Pesa Daraja credentials** — obtain from Safaricom portal
5. **David's GitHub username** — for clone URL in README
