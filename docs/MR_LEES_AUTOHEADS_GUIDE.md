# Mr Lee's AUTO HEADS Guide
### The Complete Owner's Reference — Platform, Technology & Vision

---

> **AUTO HEADS** — *Where automotive passion meets commerce*  
> Kenya's premier social marketplace for automotive enthusiasts.  
> Owner: David Abel · Currency: KES · Market: Kenya & East Africa

---

## Table of Contents

1. [What is AUTO HEADS?](#1-what-is-auto-heads)
2. [The Landing Page](#2-the-landing-page)
3. [Sign Up & Login](#3-sign-up--login)
4. [Guest Access](#4-guest-access)
5. [Arten — Your AI Assistant](#5-arten--your-ai-assistant)
6. [Platform Features](#6-platform-features)
7. [Payments](#7-payments)
8. [Technology Stack](#8-technology-stack)
9. [Deployment & Hosting](#9-deployment--hosting)
10. [Environment Variables You Must Set](#10-environment-variables-you-must-set)
11. [Firebase Setup Checklist](#11-firebase-setup-checklist)
12. [Security Rules](#12-security-rules)
13. [What's Coming Next](#13-whats-coming-next)

---

## 1. What is AUTO HEADS?

AUTO HEADS is a **dark-themed, premium social e-gallery marketplace** built specifically for Kenya's automotive community. It brings together car lovers, collectors, mechanics, tuners, and dealers in one beautifully designed space.

### What users can do

- **Showcase** their vehicles, builds, and parts with photos and stories
- **Buy and sell** cars, motorbikes, spare parts, accessories, and services
- **Discover** trending builds and featured listings in a curated feed
- **Follow** other enthusiasts and interact through likes, comments, and saves
- **Support creators** through a monthly Supporters subscription model
- **Pay securely** via M-Pesa (Kenyan buyers) or Stripe (international cards)

### The brand promise

The experience is cinematic and premium. Every screen is dark-themed with automotive energy. Users should feel like they stepped into an exclusive car club the moment they land on the site.

---

## 2. The Landing Page

The landing page (`/`) is the first thing every visitor sees. It is deliberately minimal — no clutter, no navigation, just impact.

### What's on screen

A single large circular button — a photographic ignition button — centered on a near-black background (`#0b0b12`). That is the entire landing page.

### The button

The button photo (`public/button.png`) shows a physical GET STARTED ignition switch. It sits at `clamp(260px, 58vmin, 480px)` — meaning it scales perfectly from the smallest phone screen to the largest desktop monitor while always remaining circular.

### The animation

The button pulses like a living thing, replicating the iPhone emotional tracker orb animation:

- **Breathing pulse** — the orb slowly scales up 2.8% and increases its blue glow every 3.4 seconds, then softly returns
- **Two expanding ring ripples** — concentric circles grow outward from the button and fade to nothing, staggered by 1.7 seconds each
- Tapping the button plays a **cinematic musical swell** (C-major pad chord with low-pass filter sweep and a high sparkle at 1.8 seconds) then navigates to `/register`

### What is NOT on the landing page

By design, there is no navigation, no logo, no tagline, no text — only the button. Arten (the AI assistant) is also hidden on this page. Everything starts on the next screen.

---

## 3. Sign Up & Login

Both pages use the same visual language: a glassmorphism panel on the dark automotive background, with an animated spinning gradient border.

### Background

- Near-black base (`#0b0b12`)
- Large blurred orange glow (top-right corner) — brand warmth
- Large blurred electric blue glow (bottom-left corner) — technology feel
- Subtle dot-grid overlay across the full background
- **AUTO HEADS** wordmark at the top of both pages, linking back to the landing page

### The glass panel

The central card uses true glassmorphism:

- Semi-transparent dark glass background
- `backdrop-filter: blur(24px) saturate(160%)` — everything behind it is softly blurred
- **Animated conic gradient border** — a soft orange-to-blue gradient slowly rotates around the panel edge continuously (one full rotation every 10 seconds)
- Deep drop shadow for depth

### Login (`/login`)

| Element | Detail |
|---------|--------|
| Email field | Envelope icon, autocomplete enabled |
| Password field | Lock icon, show/hide toggle button |
| Forgot password | Inline — no new page. Clicking it reveals a reset email form and confirmation |
| Sign In button | Orange gradient, glows on hover |
| Google sign-in | Official Google colour logo, glass button |
| Guest access | Dashed border button — "Browse as guest" |
| Register link | Bottom of panel |

**Forgot password flow:** User clicks "Forgot password?", types their email, clicks Send — Firebase sends a reset link instantly. A green success badge confirms it. No page change required.

### Register (`/register`) — 3-Step Wizard

**Step 1 — Your Identity**

| Field | Validation |
|-------|-----------|
| Full name | Minimum 2 characters |
| Username | Lowercase letters, numbers, underscores only. 3–30 characters. Live preview shows `autoheads.co/@username` |
| Email | Standard email format |
| Password | Minimum 8 characters. Live strength meter: Weak / Fair / Good / Strong (colour changes from red through to green) |
| Confirm password | Must match. Shows a green tick when it does |

**Step 2 — Verify Your Phone**

- Kenya phone number, +254 prefix pre-filled
- Sends a real SMS via Firebase Phone Authentication
- 6-box OTP entry — digits auto-advance as you type, backspace goes back, paste fills all boxes at once
- 60-second resend countdown timer
- Verify button activates once all 6 digits are filled

**Step 3 — Recovery Setup**

- Optional recovery email (must be different from login email)
- For account access if you ever lose your password
- Terms of Service and Privacy Policy checkbox (required)
- "Create my account" button

### Visual feedback throughout

- **Orange glow** on every input when it has focus
- **Green border** on valid inputs
- **Red border + shake animation** on error inputs
- **Spinner** inside buttons while loading
- **Green success badge** for confirmations

---

## 4. Guest Access

The Login page has a "Browse as guest" button. When tapped:

- Firebase creates a temporary anonymous account silently in the background
- User is taken directly to the feed (`/feed`)
- They can browse all listings, vehicles, and profiles freely
- **They cannot:** comment, like, buy, upload, or interact with content
- **They can** convert to a full account later without losing their session

This is the correct pattern for attracting visitors who are not yet ready to commit to registration.

---

## 5. Arten — Your AI Assistant

```
╔══════════════════════════════════╗
║                                  ║
║      ●●●●●●●●●●●●●●●●●●●●       ║
║    ●                          ●  ║
║   ●    ┌──────────────┐       ●  ║
║   ●    │  ██    ██    │       ●  ║
║   ●    │  ██    ██    │       ●  ║
║   ●    └──────────────┘       ●  ║
║    ●                          ●  ║
║      ●●●●●●●●●●●●●●●●●●●●       ║
║                                  ║
║              arten               ║
╚══════════════════════════════════╝

  A 100px dark sphere · Blue-indigo rim glow
  Dot-matrix face plate · Twin white eye bars
  Teal-to-indigo gradient face panel
```

### What Arten looks like

Arten is a dark sphere (100px diameter) fixed to the bottom-right corner of the screen. It has:

- **Body:** Deep dark sphere with a blue-indigo rim glow — like a planet viewed from space
- **Face plate:** A 58×30px rounded rectangle with a teal-to-indigo gradient and a dot-matrix texture overlay
- **Eyes:** Two white 8×20px rectangular pill bars inside the face plate
- **Particle canvas:** Tiny glowing particles float upward above the orb
- **Waveform canvas:** A vertical bar visualiser to the left of the orb

### Where Arten appears

**Arten is hidden on the landing page (`/`).** It only appears from the Login page (`/login`) and Register page (`/register`) onwards — on every page the user visits after that.

### Arten's states

| State | Eyes | Orb colour | Waveform |
|-------|------|-----------|----------|
| Idle | White glow, still | Blue-indigo rim | Single thin vertical line |
| Floating | White, gentle | Blue-indigo | Same line |
| Speaking | White, pulse animation | Brighter blue rim, shimmer | Energetic blue bars |
| Listening | Green glow | Green rim | Teal bars |

### How Arten's animations work

- **Idle:** Orb floats gently up and down (3.2 second cycle)
- **Speaking:** Orb shimmers (scale + brightness) at 0.55s intervals; waveform bars animate energetically; particles rise faster and glow blue
- **Listening:** Orb pulses gently; eyes turn green; waveform turns teal; particles glow green
- **Entrance:** Arten slides up from below and scales in (0.7 seconds) when a new page loads
- **Collapsed:** When not yet tapped, Arten sits at 60% scale (bottom-right, unobtrusive)
- **Open:** First tap scales Arten to 100% and plays a greeting

### Arten's voice

Arten speaks through ElevenLabs Text-to-Speech:

- **Voice:** Bella (`EXAVITQu4vr4xnSDxMaL`) — warm, friendly female voice
- **Model:** `eleven_multilingual_v2` (supports natural emotional inflection)
- **Settings:** Stability 0.62 · Similarity boost 0.75 · Style 0.30 · Speaker boost on
- **Endpoint:** `/api/bot-speak` (proxied through Next.js, cached by CDN for 24 hours — same phrase is never re-fetched)
- **Fallback:** If ElevenLabs API key is not set, Arten automatically falls back to the browser's Web Speech API, picking the best female English voice available

### Arten's knowledge (what it can answer)

| Topic | Sample question |
|-------|----------------|
| Pricing & fees | "Is it free to list?" |
| Registration | "How do I get started?" |
| Listings | "How do I sell my car?" |
| Orders & buying | "How do I buy something?" |
| Payments | "Do you accept M-Pesa?" |
| Login | "I forgot my password" |
| Support | "How do I contact the team?" |
| Safety | "Is this platform safe?" |
| Platform overview | "What is Auto Heads?" |
| Kenya / East Africa | "Is this only for Nairobi?" |
| Analytics | "Can I see my store stats?" |
| Sharing | "Can I share my listing?" |
| Supporters | "What is the Supporters feature?" |
| Free / trial | "Do I need to pay to join?" |

### Arten's conversation flow

1. User arrives on any page after landing → Arten appears (bottom-right, small)
2. User taps Arten → scales up, plays a greeting (rotates through 4 different ones)
3. Arten finishes speaking → automatically starts listening (mic activates)
4. User speaks a question → Arten classifies it, speaks the answer
5. Answer finishes → Arten listens again automatically (loop)
6. User can tap Arten at any time to re-greet and restart

### Audio reliability

Arten uses the **Web Audio API (`AudioContext`)** approach — not standard `Audio.play()`. The AudioContext is unlocked synchronously on the user's first tap, which permanently bypasses the browser's autoplay restriction. This means Arten's voice works on **iOS Safari, Android Chrome, and all desktop browsers** without any "click to unmute" prompts.

---

## 6. Platform Features

### The Feed (`/feed`)

The main content feed. Browsable without login. Shows:

- Vehicle listings with photos, price (KES), make/model, seller
- Filter by category: Engine, Tyre, Component, Accessory, Full Vehicle, Project, Other
- Search by make, model, or location
- Featured listings are promoted to the top
- Algorithm ranks by engagement (likes, views, comments) and recency

### Listing Detail (`/project/[id]`)

Full listing page with:

- Photo gallery
- Price and buy options
- Seller profile link
- Share button (WhatsApp, Instagram, direct link)
- Comments section (logged-in users only)
- Like and save buttons (logged-in users only)

### Upload (`/upload`)

For sellers. Requires login. Fields:

- Project/listing name
- Description (up to 2,000 characters)
- Category selection
- Photos and videos (up to 50 MB images, 200 MB video)
- Price (KES)
- Buy options: whole vehicle or buy shares (fractional ownership)

### Profile (`/profile/[username]`)

Public seller profile showing:

- Display name and username
- All their listings
- Supporters count
- Social links (Instagram, Twitter, Facebook)
- Contact/message button

### Dashboard (`/dashboard`)

Private analytics for the seller:

- Store visits (real-time)
- Listing view counts
- Order history
- Revenue over time

---

## 7. Payments

AUTO HEADS supports two payment methods:

### M-Pesa (Kenya)

- Integrated via **Safaricom Daraja API**
- STK Push — buyer receives a prompt on their phone
- Payment is confirmed server-side via webhook
- PIN never leaves the buyer's phone
- Funds held in escrow until buyer confirms receipt

### Stripe (International)

- Full Stripe integration for card payments
- Supports Visa, Mastercard, and Apple Pay
- Webhook signature verification (server-side only)
- No card details stored on AUTO HEADS servers

### Transaction security

- All payment writes happen **server-side only** (Firebase Cloud Functions)
- Firestore rules **deny any direct client write** to `/transactions`
- Every transaction is write-once — it cannot be edited after creation

---

## 8. Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS Modules |
| Fonts | Poppins (headings) · Inter (body) |
| Authentication | Firebase Auth (email, Google, phone, anonymous) |
| Database | Firestore (Firebase) |
| File storage | Firebase Storage |
| State management | Zustand |
| Form validation | Zod |
| Voice (AI) | ElevenLabs `eleven_multilingual_v2` |
| Payments | M-Pesa Daraja + Stripe |
| Hosting | Vercel |
| Backend functions | Firebase Cloud Functions (Node.js 18) |
| Analytics | Firebase Analytics |
| CI/CD | GitHub Actions |

### Architecture pattern

- **Server Components** handle metadata, routing, and data fetching
- **Client Components** (`"use client"`) handle all interactivity, animations, and browser APIs
- Auth forms use `next/dynamic` with `ssr: false` so Firebase never runs server-side during build
- Firebase Admin SDK (server-only) uses a lazy Proxy pattern — never initialises at build time
- All secrets live in environment variables only — never in code

---

## 9. Deployment & Hosting

The platform is deployed on **Vercel** and connected to the GitHub repository `gitongalewis190-alt/auto-heads`.

Every push to the `main` branch triggers an automatic deployment. Vercel rebuilds and deploys the updated site within about 2 minutes.

### Deployment pipeline

```
Developer pushes code
       ↓
GitHub receives push
       ↓
GitHub Actions runs:
  • TypeScript type check (must pass)
  • 34 smoke tests (must pass)
  • Lint check (warning only)
       ↓
Vercel builds Next.js app
       ↓
Live on autoheads.vercel.app (or custom domain)
```

---

## 10. Environment Variables You Must Set

Log into **Vercel → Project → Settings → Environment Variables** and add all of these. Set each one to **Production and Preview**.

### Firebase (Public — safe to expose)

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

Find these in: Firebase Console → Project Settings → General → Your apps → Web app → Config

### Firebase Admin (Secret — server only)

```
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
```

Find these in: Firebase Console → Project Settings → Service accounts → Generate new private key

> **Important:** `FIREBASE_PRIVATE_KEY` contains line breaks. Paste it exactly as it appears in the JSON file, with the `-----BEGIN PRIVATE KEY-----` header and `-----END PRIVATE KEY-----` footer.

### ElevenLabs (Secret — server only)

```
ELEVENLABS_API_KEY
```

Get this from: elevenlabs.io → Profile → API Keys

Optional — if you want to change Arten's voice:
```
ELEVENLABS_VOICE_ID
```
Default is Bella (`EXAVITQu4vr4xnSDxMaL`). See `docs/BOT_CONTEXT.md` for other voice IDs.

### Payments (Secret — server only)

```
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
MPESA_CONSUMER_KEY
MPESA_CONSUMER_SECRET
MPESA_PASSKEY
MPESA_SHORTCODE
```

### App

```
NEXT_PUBLIC_APP_NAME=AUTO HEADS
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

---

## 11. Firebase Setup Checklist

In **Firebase Console**, complete these steps once:

### Authentication → Sign-in methods

Enable all four:

- [x] **Email/Password** — standard login and register
- [x] **Google** — one-tap Google sign-in
- [x] **Anonymous** — guest browsing mode
- [x] **Phone** — OTP verification on registration

### Authentication → Settings → Authorized domains

Add your production domain:
- `your-project.vercel.app`
- `your-custom-domain.com` (if you have one)
- `localhost` (for local development)

### Firestore → Rules

Rules are defined in `docs/FIREBASE_RULES.md`. Core rules:
- Anyone can read public listings and profiles
- Only authenticated users can write listings and comments
- Only server-side (Cloud Functions) can write to `/transactions`
- Only admins (set manually in Firebase Console) can access admin routes

### Admin role

Admin role is **set manually** in Firebase Console only:

1. Firebase Console → Firestore → Data
2. Find the user's document under `/users/{uid}`
3. Set the field `role` to `"admin"`

There is no self-service admin registration — this is intentional security.

---

## 12. Security Rules

| Rule | Detail |
|------|--------|
| Secrets | Never committed to GitHub — environment variables only |
| Firebase API keys | Public keys are safe to expose (they are scoped by Firebase security rules) |
| Admin credentials | Service account JSON shared only via secure channel (1Password / Signal) — never email |
| Transactions | Write-once, server-side only — Firestore rules deny any direct client write |
| Stripe webhooks | Signature verified before any processing |
| Passwords | Handled entirely by Firebase Auth — AUTO HEADS never sees or stores passwords |
| Phone numbers | Verified via Firebase Phone Auth — stored as verified metadata only |

---

## 13. What's Coming Next

The platform is production-ready at its core. The following features are planned for upcoming phases:

### Near term
- Firestore security rules deployment
- Full admin dashboard (user management, listing moderation)
- Feed page with live Firestore data
- Upload flow connected to Firebase Storage

### Medium term
- Supporters subscription (monthly recurring via Stripe)
- In-app messaging between buyers and sellers
- Fractional ownership (buy shares of a vehicle)
- Push notifications

### Arten upgrades
- Arten will have full account context after login (can see your listings, orders, balance)
- Arten will assist with creating listings (voice-guided upload)
- Memory across sessions (remembers returning users)

---

## Quick Reference

| What | Where |
|------|-------|
| Source code | `gitongalewis190-alt/auto-heads` on GitHub |
| Hosting | Vercel (auto-deploys on push to `main`) |
| Firebase project | Firebase Console (same Google account) |
| ElevenLabs | elevenlabs.io → Profile → API Keys |
| Arten voice | Bella — `EXAVITQu4vr4xnSDxMaL` |
| Default currency | KES |
| Landing page | `/` |
| Login | `/login` |
| Register | `/register` |
| Feed | `/feed` |
| Bot endpoint | `/api/bot-speak` |
| Voice endpoint | `/api/tts` |
| AI spec document | `docs/BOT_CONTEXT.md` |
| This document | `docs/MR_LEES_AUTOHEADS_GUIDE.md` |

---

*Document prepared for David Abel — AUTO HEADS platform owner.*  
*Last updated: June 2026.*  
*For technical changes, reference the GitHub repository and commit history.*
