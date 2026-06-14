# Changelog

All notable changes to AUTO HEADS will be documented here.

Format: `## [version] — YYYY-MM-DD`

---

## [0.1.2] — 2026-06-14

- Landing page: rotating chrome bezel + counter-rotating LED ring (spinning ignition collar)
- Voice: Web Speech API speaks "Let's get started." 1 s after page opens (deep male voice)
- Speaking indicator: purple glow ring pulses around button while voice is active
- Removed all text except GET STARTED (no logo, tagline, nav links, sun glow)
- Zoom in: rings scaled up ~25 % (outer ring 580 → 720 px)

## [0.1.1] — 2026-06-13

- Landing page: orbital rings, animated grid lines, ignition GET STARTED button
- Build/deploy hardening: next.config.mjs, lazy Firebase Admin, force-dynamic
  auth-gated routes, ESLint config, pinned Node version
- Mandatory smoke tests (34) wired into CI
- Verified clean: type-check, lint, tests, and production build all pass

## [0.1.0] — 2026-06-13

- Initial repository structure created
- All folders and placeholder files scaffolded per architecture specification
- Root config files: package.json, tsconfig.json, tailwind.config.ts, next.config.ts
- Firebase config: firestore.rules, storage.rules, firestore.indexes.json, firebase.json
- Environment variable template: .env.example
- CI/CD workflows: deploy, preview, test, functions, security
- Documentation: README, SETUP, ARCHITECTURE, FIREBASE_RULES, PAYMENTS, ADMIN_GUIDE, HANDOVER, API_REFERENCE, CONTRIBUTING
