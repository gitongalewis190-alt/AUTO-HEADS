"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// ── Knowledge base ─────────────────────────────────────────────────────────────
const KNOWLEDGE: { keys: RegExp; reply: string }[] = [
  {
    keys: /price|cost|plan|fee|charge|paid|subscription|how much/,
    reply: "Auto Heads is free to browse and free to list. We take a small commission only on completed sales — no monthly subscription required to get started.",
  },
  {
    keys: /sign.?up|register|join|create.?account|get.?start|onboard/,
    reply: "Getting started takes under two minutes. Tap Get Started, enter your email, and your account is live instantly. No credit card required.",
  },
  {
    keys: /product|item|car|vehicle|bike|part|listing|upload|add|sell|post/,
    reply: "You can list any vehicle, part, or accessory with unlimited listings. Add photos, set your price, and your listing goes live immediately for buyers across Kenya.",
  },
  {
    keys: /order|buy|purchase|find|search|browse|customer/,
    reply: "Browse the feed without an account — no registration needed to explore. When you find what you want, place your order securely. Payment is protected until you confirm receipt.",
  },
  {
    keys: /mpesa|m-pesa|payment|stripe|pay|checkout|mobile.?money|card/,
    reply: "We support M-Pesa for Kenyan buyers and Stripe for international cards. Your money is held securely until the transaction is confirmed. We never store PINs or card details.",
  },
  {
    keys: /login|sign.?in|account|log.?in|existing|password|forgot/,
    reply: "Already a member? Tap Login to sign in with your email and password. If you forgot your password, tap Forgot Password on the login page to reset it instantly.",
  },
  {
    keys: /support|help|problem|issue|contact|team|stuck/,
    reply: "Our support team responds within 24 hours. Use the contact form inside the app. For urgent issues, mention it clearly and we will prioritise your case.",
  },
  {
    keys: /safe|secure|trust|scam|legit|verify/,
    reply: "Auto Heads verifies sellers and uses secure payment escrow — your money never goes directly to a seller until you confirm the transaction. All accounts are Firebase-protected.",
  },
  {
    keys: /what|auto heads|platform|about|app|is this|overview|how.*work/,
    reply: "Auto Heads is Kenya's premier social marketplace for automotive enthusiasts. Showcase your builds, buy and sell vehicles and parts, and connect with the East African car community.",
  },
  {
    keys: /africa|kenya|nairobi|african|local|east africa/,
    reply: "Auto Heads is built for East Africa. We support M-Pesa natively, listings are in KES, and the platform is optimised for how Kenyan buyers and sellers actually do business.",
  },
  {
    keys: /analytic|stat|dashboard|visit|traffic|report|insight/,
    reply: "Your seller dashboard shows store visits, listing views, order history, and revenue over time — all updated in real time so you always know how your listings perform.",
  },
  {
    keys: /share|link|url|promote|market|social|instagram|whatsapp/,
    reply: "Every listing and profile has a clean shareable link. Share it on WhatsApp, Instagram, or anywhere — anyone who taps it lands directly on your listing ready to buy.",
  },
  {
    keys: /hello|hi|hey|greet|who are you|what are you/,
    reply: "Hello. I am Arten, your Auto Heads assistant. I can help with pricing, payments, listings, account questions, and more. What would you like to know?",
  },
  {
    keys: /supporter|subscription|creator|follow|fan/,
    reply: "Supporters is a monthly subscription feature where fans back their favourite sellers. Creators receive a share of supporter fees and can offer exclusive content to supporters.",
  },
  {
    keys: /free|trial|demo|test/,
    reply: "Browsing and listing is always free. We only earn a small commission when you make a sale — our success is directly tied to yours.",
  },
];

const GREETINGS = [
  "Hello. I am Arten, your Auto Heads guide. Ask me about pricing, listings, payments, or how the platform works.",
  "Good to have you here. What would you like to know about Auto Heads?",
  "I am here and ready. Ask me about how to sell, how payments work, or anything else about the platform.",
  "What would you like to know? I can explain pricing, M-Pesa payments, how to list a vehicle, or how to get started.",
];

const FALLBACK = [
  "I want to give you the right answer. Try asking about pricing, listings, M-Pesa payments, or how to get started.",
  "I did not catch that clearly. Ask me something like — how do payments work, or how do I list my car?",
  "Let me help properly. Ask about the trial, payments, how to sell, or what Auto Heads is.",
];

function classify(text: string): string {
  const t = text.toLowerCase();
  for (const entry of KNOWLEDGE) {
    if (entry.keys.test(t)) return entry.reply;
  }
  return FALLBACK[Math.floor(Math.random() * FALLBACK.length)];
}

interface ArtenBotProps {
  isSpeaking?: boolean;
}

export default function ArtenBot({ isSpeaking = false }: ArtenBotProps) {
  const pathname       = usePathname();
  const waveRef        = useRef<HTMLCanvasElement | null>(null);
  const particleRef    = useRef<HTMLCanvasElement | null>(null);
  const audioRef       = useRef<HTMLAudioElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const greetIdx       = useRef(0);

  const [isOpen,      setIsOpen]      = useState(false);
  const [botSpeaking, setBotSpeaking] = useState(false);
  const [listening,   setListening]   = useState(false);

  const activeSpeaking = isSpeaking || botSpeaking;

  // ── Particle canvas (above orb) ────────────────────────────────────────────
  useEffect(() => {
    const canvas = particleRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 100; canvas.height = 70;

    const pts = Array.from({ length: 20 }, () => ({
      x: 25 + Math.random() * 50, y: 70 - Math.random() * 28,
      vy: -(0.3 + Math.random() * 0.5), vx: (Math.random() - 0.5) * 0.4,
      life: Math.random(), maxLife: 0.6 + Math.random() * 0.4, r: 1 + Math.random() * 2,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, 100, 70);
      const spk = activeSpeaking || listening;
      pts.forEach(p => {
        p.life -= 0.007 + (spk ? 0.008 : 0);
        if (p.life <= 0) {
          p.x = 25 + Math.random() * 50; p.y = 70;
          p.vy = -(0.3 + Math.random() * (spk ? 1.1 : 0.5));
          p.vx = (Math.random() - 0.5) * 0.5;
          p.life = p.maxLife; p.r = 1 + Math.random() * 2;
        }
        p.x += p.vx; p.y += p.vy;
        const a = p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * a, 0, Math.PI * 2);
        const hue = listening ? "170" : spk ? "210" : "230";
        ctx.fillStyle = `hsla(${hue},100%,72%,${a * 0.65})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [activeSpeaking, listening]);

  // ── Waveform canvas (left of orb) ──────────────────────────────────────────
  useEffect(() => {
    const canvas = waveRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 16; canvas.height = 100;

    const bars = Array.from({ length: 10 }, (_, i) => ({
      y: 8 + i * 8, h: 2, phase: Math.random() * Math.PI * 2,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, 16, 100);
      if (activeSpeaking || listening) {
        bars.forEach(b => {
          b.phase += listening ? 0.09 : 0.2;
          b.h = 1 + Math.abs(Math.sin(b.phase)) * (listening ? 7 : 11);
          const alpha = 0.4 + Math.abs(Math.sin(b.phase)) * 0.6;
          ctx.fillStyle = listening
            ? `rgba(52,211,153,${alpha})`
            : `rgba(80,140,255,${alpha})`;
          ctx.fillRect(8 - b.h / 2, b.y, b.h, 2);
        });
      } else {
        ctx.fillStyle = "rgba(80,120,220,0.28)";
        ctx.fillRect(7, 6, 1, 86);
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [activeSpeaking, listening]);

  // ── Start listening ─────────────────────────────────────────────────────────
  const startListening = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    if (!SR) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r: any = new SR();
    recognitionRef.current = r;
    r.continuous = false; r.interimResults = false; r.lang = "en-US";
    setListening(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    r.onresult = async (e: any) => {
      setListening(false);
      const text: string = e.results?.[0]?.[0]?.transcript ?? "";
      await speakReply(classify(text));
    };
    r.onerror = () => setListening(false);
    r.onend   = () => setListening(false);
    try { r.start(); } catch { setListening(false); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Speak via ElevenLabs /api/bot-speak ────────────────────────────────────
  const speakReply = useCallback(async (text: string) => {
    audioRef.current?.pause();
    audioRef.current = null;
    setBotSpeaking(true);
    try {
      const res = await fetch(`/api/bot-speak?text=${encodeURIComponent(text)}`);
      if (!res.ok) throw new Error("no-tts");
      const blob  = await res.blob();
      const url   = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => {
        setBotSpeaking(false);
        audioRef.current = null;
        URL.revokeObjectURL(url);
        setTimeout(startListening, 300);
      };
      audio.onerror = () => {
        setBotSpeaking(false);
        audioRef.current = null;
        URL.revokeObjectURL(url);
      };
      await audio.play();
    } catch {
      setBotSpeaking(false);
    }
  }, [startListening]);

  // ── Tap handler ─────────────────────────────────────────────────────────────
  const handleClick = useCallback(async () => {
    try { recognitionRef.current?.stop(); } catch { /* ignore */ }
    recognitionRef.current = null;
    setListening(false);
    if (!isOpen) setIsOpen(true);
    const greeting = GREETINGS[greetIdx.current % GREETINGS.length];
    greetIdx.current += 1;
    await speakReply(greeting);
  }, [isOpen, speakReply]);

  // ── Cleanup ─────────────────────────────────────────────────────────────────
  useEffect(() => () => {
    audioRef.current?.pause();
    try { recognitionRef.current?.stop(); } catch { /* ignore */ }
  }, []);

  // Hidden on landing page — only available from login/register onwards
  if (pathname === "/") return null;

  /* ── Visual state helpers ─────────────────────────────────────────────── */
  const eyeColor = listening ? "#34d399" : "#ffffff";
  const eyeGlow  = listening
    ? "0 0 8px #34d399, 0 0 16px rgba(52,211,153,0.6)"
    : activeSpeaking
      ? "0 0 8px #fff, 0 0 16px rgba(160,200,255,0.7)"
      : "0 0 5px rgba(255,255,255,0.65)";

  const orbShadow = listening
    ? "inset 0 0 60px rgba(30,160,120,0.35), inset 0 0 25px rgba(52,211,153,0.2), 0 0 0 1.5px rgba(52,211,153,0.5), 0 0 24px rgba(52,211,153,0.3)"
    : activeSpeaking
      ? "inset 0 0 60px rgba(40,80,220,0.5), inset 0 0 25px rgba(80,120,255,0.3), 0 0 0 1.5px rgba(100,140,255,0.6), 0 0 28px rgba(80,120,255,0.4)"
      : "inset 0 0 50px rgba(30,50,180,0.35), inset 0 0 20px rgba(60,90,200,0.2), 0 0 0 1px rgba(80,110,200,0.25), 0 0 16px rgba(60,90,200,0.2)";

  const faceGrad = listening
    ? "linear-gradient(135deg, rgba(0,210,160,0.55) 0%, rgba(30,190,190,0.45) 45%, rgba(80,80,220,0.35) 100%)"
    : activeSpeaking
      ? "linear-gradient(135deg, rgba(0,200,220,0.55) 0%, rgba(60,130,255,0.50) 45%, rgba(120,60,220,0.40) 100%)"
      : "linear-gradient(135deg, rgba(0,180,200,0.40) 0%, rgba(50,110,240,0.38) 45%, rgba(100,50,200,0.30) 100%)";

  const orbAnim = listening
    ? "arten-listen 1.6s ease-in-out infinite"
    : activeSpeaking
      ? "arten-shimmer 0.55s ease-in-out infinite alternate"
      : "arten-float 3.2s ease-in-out infinite";

  return (
    <div
      style={{
        position: "fixed", bottom: 28, right: 24, zIndex: 9000,
        display: "flex", flexDirection: "column", alignItems: "center",
        userSelect: "none",
        transform: `scale(${isOpen ? 1 : isSpeaking ? 0.7 : 0.6})`,
        transformOrigin: "bottom right",
        transition: "transform 0.55s cubic-bezier(0.34,1.5,0.64,1)",
        animation: "arten-entrance 0.7s cubic-bezier(0.34,1.5,0.64,1) 0.4s both",
      }}
    >
      {/* Particle canvas */}
      <canvas ref={particleRef} style={{ display: "block", marginBottom: -6 }} />

      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {/* Waveform canvas */}
        <canvas ref={waveRef} style={{ display: "block" }} />

        {/* ── Arten orb ─────────────────────────────────────────────────── */}
        <div
          onClick={handleClick}
          role="button"
          tabIndex={0}
          aria-label="Arten — Auto Heads AI assistant. Tap to speak."
          onKeyDown={e => e.key === "Enter" && handleClick()}
          style={{
            width: 100, height: 100, borderRadius: "50%", cursor: "pointer",
            /* Deep dark sphere with blue-indigo rim glow — matches reference */
            background: "radial-gradient(circle at 38% 30%, rgba(70,100,160,0.5) 0%, rgba(12,16,45,0.92) 55%, rgba(4,5,18,0.98) 100%)",
            boxShadow: orbShadow,
            animation: orbAnim,
            transition: "box-shadow 0.35s ease",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden",
          }}
        >
          {/* Top-left specular highlight */}
          <div style={{
            position: "absolute", top: 10, left: 18,
            width: 28, height: 12, borderRadius: "50%",
            background: "rgba(180,220,255,0.12)", filter: "blur(5px)",
            pointerEvents: "none",
          }} />

          {/* Face plate — dot-matrix teal-to-indigo panel */}
          <div style={{
            width: 58, height: 30, borderRadius: 7,
            background: faceGrad,
            boxShadow: listening
              ? "0 0 12px rgba(52,211,153,0.6), inset 0 0 8px rgba(52,211,153,0.3)"
              : activeSpeaking
                ? "0 0 12px rgba(80,160,255,0.7), inset 0 0 8px rgba(80,140,255,0.35)"
                : "0 0 6px rgba(50,120,220,0.35), inset 0 0 6px rgba(60,100,200,0.2)",
            display: "flex", alignItems: "center", justifyContent: "space-evenly",
            transition: "background 0.35s, box-shadow 0.35s",
            position: "relative", overflow: "hidden",
          }}>
            {/* Dot-matrix texture */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)",
              backgroundSize: "4px 4px", pointerEvents: "none",
            }} />

            {/* Twin eye bars — tall rectangular pills */}
            {[0, 0.12].map((delay, i) => (
              <div key={i} style={{
                width: 8, height: 20, borderRadius: 4,
                background: eyeColor,
                boxShadow: eyeGlow,
                animation: listening
                  ? `arten-eye-listen 1.2s ease-in-out infinite alternate ${delay}s`
                  : activeSpeaking
                    ? `arten-eye-pulse 0.5s ease-in-out infinite alternate ${delay * 0.7}s`
                    : "none",
                transition: "background 0.3s, box-shadow 0.3s, height 0.2s",
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Status label */}
      <div style={{
        marginTop: 6, fontSize: 10, letterSpacing: "0.08em",
        fontFamily: "system-ui, sans-serif", textAlign: "center",
        color: listening ? "rgba(52,211,153,0.75)" : "rgba(140,170,255,0.45)",
        opacity: listening || !isOpen ? 1 : 0,
        transition: "opacity 0.3s, color 0.3s",
      }}>
        {listening ? "listening…" : !isOpen ? "arten" : ""}
      </div>

      <style>{`
        @keyframes arten-entrance { from{opacity:0;transform:translateY(18px) scale(0.8)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes arten-float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes arten-shimmer  { 0%{transform:translateY(-1px) scale(1);filter:brightness(1)} 100%{transform:translateY(1px) scale(1.04);filter:brightness(1.22)} }
        @keyframes arten-listen   { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
        @keyframes arten-eye-pulse  { 0%{transform:scaleY(1);opacity:0.88}  100%{transform:scaleY(1.25);opacity:1} }
        @keyframes arten-eye-listen { 0%{transform:scaleY(0.5);opacity:0.65} 100%{transform:scaleY(1.1);opacity:1} }
      `}</style>
    </div>
  );
}
