# AUTO HEADS — Developer Handover

This document is for any developer taking over the AUTO HEADS codebase.

---

## What This Is

AUTO HEADS is a social e-gallery marketplace for automotive enthusiasts in Kenya. Users post vehicle parts, engines, tires, projects, and accessories. Buyers can purchase items, buy fractional shares, or donate. Contact happens via call, WhatsApp, SMS, email, or in-app message.

**Owner**: David Abel  
**Support email**: support@autoheads.com  
**Stack**: Next.js 14 + Firebase (Auth, Firestore, Storage, Functions) + Stripe + M-Pesa  

---

## Handover Checklist

### GitHub
- [ ] David Abel has added you as a collaborator: Settings → Collaborators
- [ ] You have cloned the repo and followed `docs/SETUP.md`

### Firebase
- [ ] David has added you to the Firebase project: Console → Project Settings → Users and Permissions
- [ ] You have received the service account JSON via secure channel (not email)

### Vercel
- [ ] David has added you to the Vercel project: Dashboard → Team → Members

### Secrets
- [ ] You have received `.env.local` values via 1Password, Bitwarden, or Signal
- [ ] You have NOT received secrets via email or Slack — if you did, rotate them immediately

---

## Key Architecture Decisions (and why)

| Decision | Reason |
|---|---|
| Next.js App Router | Server components, metadata API, Edge Middleware, Vercel native |
| Firebase (not Supabase/PlanetScale) | Kenya market: M-Pesa integration, reliable in Africa, generous free tier |
| Zustand (not Redux) | Simpler, no boilerplate, sufficient for this app's state complexity |
| Session cookies (not JWT in localStorage) | Security — httpOnly cookies prevent XSS token theft |
| Cloud Functions for payments (not API routes) | Firestore triggers ensure consistency even if webhooks are delayed |
| Transactions write-once from server | Prevents any client from manipulating payment amounts or status |
| Admin role in Firestore (not Firebase Custom Claims) | Easier to inspect and change in Firebase Console without code deployment |

---

## Things That Are NOT Done Yet (Stubs)

Search `// TODO:` in the codebase for a full list. Major areas:

- `useSearch()` — debounced Firestore query
- `useFeed()` — infinite scroll with algorithm ranking
- `LoginForm` / `RegisterForm` — form fields + Firebase Auth actions
- `UploadForm` — all fields + media upload
- `InteractModal` — five contact options
- `FinanceModal` — three-step payment flow
- `CommentThread` — full render + reply threading
- `ProfileHeader` — avatar, bio, follow button
- `useAdminSettings()` — Firestore /settings/platform reads
- All admin tables — ProjectsTable, UsersTable, TransactionsTable

---

## Passwords / Secrets

Never store secrets in code. All secrets are in:
- `.env.local` (local dev — never committed)
- Vercel Environment Variables (production)

To rotate a secret: update in Vercel → redeploy → update in local `.env.local`.
