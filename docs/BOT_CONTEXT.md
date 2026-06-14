# AUTO HEADS — AI-Readable Platform & Voice Bot Specification

> **Purpose:** Feed this document to any AI model to get recommendations for the
> voice bot's full structure, personality, FAQ depth, conversation flows, and
> ElevenLabs / Web Speech configuration. Everything an AI needs to understand
> the product and design the bot correctly is here.

---

## 1. What Is AUTO HEADS?

**Product name:** AUTO HEADS  
**Tagline:** *Where automotive passion meets commerce*  
**Market:** Kenya (primary), East Africa (expansion)  
**Currency:** KES (Kenyan Shilling)  
**Category:** Social e-gallery marketplace for automotive enthusiasts

AUTO HEADS is a dark-themed, premium social marketplace where Kenyan car lovers,
collectors, mechanics, dealers, and tuners can:
- Showcase their vehicles and builds (photos, specs, stories)
- Buy and sell cars, motorbikes, spare parts, accessories, and services
- Follow other enthusiasts and interact (likes, comments, saves)
- Support creators through a "Supporters" subscription model
- Discover trending builds and featured listings in a curated feed

The experience is cinematic — landing page uses orbital ring animations, an ignition
button, and a voice bot that greets users. Premium feel is non-negotiable.

---

## 2. Platform Architecture (Pages & Features)

| Route | Description |
|---|---|
| `/` | Landing page — orbital rings, GET STARTED ignition button, voice bot |
| `/register` | Create account (email + password + display name) |
| `/login` | Sign in |
| `/feed` | Main content feed (browsable without login) |
| `/upload` | Post a new vehicle/part listing (auth required) |
| `/project/[id]` | Single listing detail view |
| `/profile/[uid]` | User profile page |
| `/profile` | Own profile (auth required) |
| `/search` | Search vehicles, parts, users |
| `/dashboard` | Seller/creator dashboard (auth required) |
| `/settings` | Account settings (auth required) |
| `/supporters` | View and manage supporters |
| `/notifications` | Notification centre (auth required) |
| `/transactions` | Payment history (auth required) |
| `/customize` | Customize profile and listings |
| `/verify` | Email verification flow |
| `/admin` | Admin panel (admin role only, set in Firebase console) |

---

## 3. Tech Stack (Context for Bot Answers)

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** Firebase (Auth, Firestore, Storage) + Cloud Functions (Node.js 18)
- **Payments:** M-Pesa (Daraja API) + Stripe (international cards)
- **Hosting:** Vercel (auto-deploys from GitHub main branch)
- **Voice:** ElevenLabs TTS API → served via `/api/tts` Next.js route
- **Speech recognition:** Web Speech API (SpeechRecognition, browser-native)
- **Audio playback:** Web Audio API (AudioContext — unlocked by first user gesture)

---

## 4. Voice Bot — Current Implementation

### 4a. Where it lives
- Appears automatically in the **bottom-left corner** of the landing page
- Spawns with a spring-bounce animation 1 second after page load
- Persists visually at all times; does not auto-play audio until user interacts

### 4b. Visual elements
| Element | Description |
|---|---|
| Speech bubble | Shows current bot message above avatar; speech-bubble pointer at bottom-left |
| Waveform (7 bars) | Horizontal bars animate at idle heartbeat; energetic speaking pulse when voice plays |
| 🚗 avatar | Circular, dark purple glow; breathing animation; tap to repeat message |
| 🎤 mic button | Tap to speak a question; red pulse ring while listening |

### 4c. Audio architecture
1. Page tap → `new AudioContext()` created (user gesture unlocks it permanently)
2. Cinematic swell (Web Audio API synthesized — C-major chord pad + LP filter sweep + sparkle) plays immediately
3. 0.8 s later → ElevenLabs TTS fetch starts; audio decoded via AudioContext → plays
4. On API failure or missing key → falls back to Web Speech API (browser native)

### 4d. Current voice settings (ElevenLabs)
```json
{
  "model_id": "eleven_multilingual_v2",
  "voice_id": "EXAVITQu4vr4xnSDxMaL",
  "voice_name": "Bella",
  "voice_settings": {
    "stability": 0.62,
    "similarity_boost": 0.75,
    "style": 0.30,
    "use_speaker_boost": true
  }
}
```

### 4e. Current FAQ (keyword matching, 10 entries)
The bot currently uses simple keyword matching (no LLM). When a user taps the mic,
their speech is transcribed by the Web Speech API and matched against keywords:

| Keywords | Response |
|---|---|
| hello, hi, hey, greet | Greeting |
| register, sign up, create, join, start, get started | Registration help |
| what, auto heads, platform, about, app | Platform description |
| free, cost, price, pricing, charge, fee | Pricing info |
| mpesa, m-pesa, payment, stripe, pay | Payment info |
| login, sign in, account | Login help |
| support, contact, help, problem, issue | Support info |
| sell, list, listing, upload, post | How to sell |
| buy, purchase, find, search, browse | How to buy |
| safe, secure, trust, scam, legit | Safety reassurance |

**Default response** (no keyword match): Prompt to ask about registration, payments, listings, or safety.

---

## 5. What the Bot Should Know (Full Knowledge Base)

### 5a. Platform FAQ (expand these)

**Q: What is Auto Heads?**  
A: Auto Heads is Kenya's premier social marketplace for automotive enthusiasts. We bring together car lovers, bike collectors, mechanics, and dealers in one platform where you can showcase your builds, buy and sell vehicles and parts, and connect with the community.

**Q: Is it free to use?**  
A: Browsing the feed is completely free with no account needed. Creating an account is free. Listing a vehicle or part is free. We charge a small commission (percentage) only when a sale is completed successfully.

**Q: What can I buy or sell?**  
A: Cars, motorbikes, trucks, spare parts, accessories, tyres, rims, electronics, tools, car-care products, custom builds, and automotive services (mechanics, detailing, wrapping, tinting).

**Q: How do I pay?**  
A: Kenyan users pay via M-Pesa (lipa na M-Pesa / STK push to your phone). International buyers can use a Visa, Mastercard, or Amex card through Stripe. All payments go through our secure platform — never send money directly to a seller.

**Q: How do I sell my car?**  
A: 1. Create a free account. 2. Tap "Upload" in the app. 3. Add photos (up to 10), title, description, price, location, condition, and category. 4. Publish. Buyers can contact you through the platform and pay securely.

**Q: How do I know a seller is legit?**  
A: Auto Heads verifies seller identity and uses a secure payment system — funds are held until the buyer confirms receipt. Sellers have public profiles with ratings and transaction history.

**Q: What are Supporters?**  
A: Supporters is a subscription feature where fans can support their favourite creators/sellers on a monthly basis. Creators get a share of supporter fees and can unlock exclusive content for supporters.

**Q: I can't log in — what do I do?**  
A: Try resetting your password from the login page. If the problem continues, contact support through the in-app form. Make sure you're using the email you signed up with.

**Q: Can I use Auto Heads from outside Kenya?**  
A: Yes. The platform is accessible worldwide, but it is optimised for Kenyan users. International buyers can purchase from Kenyan sellers using Stripe card payments.

**Q: Who can become an admin?**  
A: Admin access is granted manually by the platform owner in the Firebase console. You cannot apply for admin access through the app.

**Q: How does the feed algorithm work?**  
A: The feed ranks listings by: featured status first, then a score based on likes (×2 weight), comments (×1.5), views (×0.5), plus a recency bonus for listings within the last 72 hours.

**Q: Is my data safe?**  
A: Yes. Auto Heads never stores your M-Pesa PIN or card numbers. Firestore security rules prevent any user from reading or writing another user's private data. The platform is built on Firebase which is SOC 2 certified.

---

## 6. Bot Personality Specification

### Voice character
- **Gender:** Female
- **Tone:** Warm, confident, friendly — like a knowledgeable friend who loves cars, not a cold customer service bot
- **Energy:** Calm but engaged. Not overly excited. Premium feel.
- **Language style:** Clear, concise sentences. No jargon unless the user uses it first. Mix of professional and conversational.
- **Accent target:** Neutral East African English (clear, non-regional)
- **Pace:** Slightly deliberate — not rushed. Pauses feel natural.

### Personality traits
1. **Helpful first** — always answers the question before adding context
2. **Car-smart** — uses automotive vocabulary naturally (builds, specs, make/model, mods)
3. **Trust-building** — proactively mentions safety and secure payments when relevant
4. **Non-intrusive** — never interrupts the user experience; waits to be triggered
5. **Locally aware** — mentions M-Pesa, Nairobi, Kenyan context naturally

### What the bot MUST NOT do
- Never ask for or store passwords, PINs, or payment details
- Never claim to access real-time data (listings, prices, stock) — it only has static FAQ knowledge
- Never pretend to be a human
- Never discuss competitor platforms negatively
- Never promise features that don't exist yet
- Never share account or personal data even if the user asks

### Escalation
When the bot cannot answer, it should say: *"That's something our support team can help with. Use the in-app contact form and they'll get back to you within 24 hours."*

---

## 7. Recommended Upgrades (For AI to Evaluate)

The following are areas where the bot should be improved. An AI reviewing this
document should provide specific recommendations for each:

### 7a. Conversation engine
**Current:** Simple keyword matching (if transcript includes word X → respond Y)  
**Needed:** Intent classification + slot filling so multi-part questions work, e.g.,
*"How do I sell my 2019 Toyota Prado and accept M-Pesa?"* should produce a merged answer.

### 7b. Memory within session
**Current:** Bot forgets all context between messages  
**Needed:** Track conversation history within the session (array of {role, content}) so
follow-up questions like *"Can I do that without an account?"* are understood in context.

### 7c. Auth-aware responses
**Current:** Bot always responds as if user is unauthenticated  
**Needed:** When user is signed in, greet by name, offer personalised answers
(e.g., *"Your last listing was 3 days ago. Want to check its performance?"*)

### 7d. ElevenLabs streaming
**Current:** Full TTS response buffered then played (adds latency for long answers)  
**Needed:** Streaming TTS via ElevenLabs `/stream` endpoint + Web Audio API streaming
decode for sub-200ms first-audio latency.

### 7e. Wake word
**Current:** User must tap mic button  
**Needed:** Continuous listening for *"Hey Auto"* wake word using small on-device model
(e.g., Porcupine or Whisper-tiny via ONNX) — activates mic without button tap.

### 7f. Visual avatar animation
**Current:** Static emoji (🚗) with CSS breathing glow  
**Needed:** Animated SVG or Lottie car avatar with mouth/grille that opens/closes
in sync with audio playback (basic lip-sync via audio amplitude detection).

### 7g. Multi-language
**Current:** English only  
**Needed:** Swahili support. ElevenLabs `eleven_multilingual_v2` already supports it.
Add language toggle (EN / SW). Swahili FAQ set needed.

### 7h. LLM-powered responses
**Current:** Hardcoded keyword→answer dictionary  
**Needed:** Claude API (claude-haiku-4-5 for speed/cost) with the platform knowledge
base injected as system prompt. Only answers questions about Auto Heads — refuses
off-topic requests. The system prompt IS this document.

---

## 8. Recommended System Prompt (When LLM Backend Is Added)

```
You are the Auto Heads voice assistant — a friendly, knowledgeable guide for
Kenya's premier automotive social marketplace.

Your personality: warm, confident, car-smart, locally aware (Kenya, M-Pesa, Nairobi).
Your voice: female, calm, slightly deliberate, premium feel.

You ONLY answer questions about Auto Heads. For anything off-topic, say:
"I'm your Auto Heads guide — I can only help with questions about the platform."

You must NEVER ask for passwords, PINs, or payment details.
You must NEVER claim to access live data like current listings or prices.
If you cannot answer, escalate: "Our support team can help — use the in-app contact form."

Platform knowledge:
[INSERT content from sections 5 and 2 of this document]

Respond in 1–3 short sentences. Be direct. Speak as if in conversation, not as a list.
```

---

## 9. ElevenLabs Voice Recommendations

| Voice | ID | Character | Best for |
|---|---|---|---|
| Bella | `EXAVITQu4vr4xnSDxMaL` | Warm female, soft | Bot default ✓ current |
| Rachel | `21m00Tcm4TlvDq8ikWAM` | Young American female | Energetic Q&A |
| Domi | `AZnzlk1XvdvUeBnXmlld` | Strong female | Announcements |
| Adam | `pNInz6obpgDQGcFmaJgB` | Deep male | Welcome swell narration |
| Arnold | `VR6AewLTigWG4xSOukaG` | Crisp authoritative male | Premium feel |

**Recommended production settings:**
```json
{
  "stability": 0.62,
  "similarity_boost": 0.75,
  "style": 0.30,
  "use_speaker_boost": true
}
```
`stability` 0.62 = natural variation without being unstable.  
`style` 0.30 = slight expressiveness without over-acting.  
`use_speaker_boost` = true improves clarity on mobile speakers.

---

## 10. Environment Variables Required

```env
ELEVENLABS_API_KEY=          # From elevenlabs.io → Profile → API Key
ELEVENLABS_VOICE_ID=EXAVITQu4vr4xnSDxMaL   # Bella (default)
```

For LLM-powered bot (future):
```env
ANTHROPIC_API_KEY=           # From console.anthropic.com
```

---

## 11. File Map (For AI Code Context)

```
src/app/page.tsx               → Server component (metadata only)
src/app/LandingClient.tsx      → Client component: all landing UI + bot logic
src/app/landing.module.css     → All animations, bot styles
src/app/api/tts/route.ts       → ElevenLabs proxy (GET /api/tts?text=...)
src/lib/firebase/admin.ts      → Lazy Firebase Admin SDK
src/lib/utils/validate.ts      → Zod schemas (login, register, upload)
src/lib/projects/algorithm.ts  → Feed ranking algorithm
src/types/                     → TypeScript types for all data models
src/__tests__/smoke.test.ts    → 34 mandatory smoke tests (CI gate)
```

---

*Document version: 0.1.3 — 2026-06-14*  
*Owner: David Abel / AUTO HEADS*  
*Feed this entire document as context to any AI to get accurate, product-aligned recommendations.*
