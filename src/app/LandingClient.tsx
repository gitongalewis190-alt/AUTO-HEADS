"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./landing.module.css";

/* ─── Cinematic swell — C-major pad + LP sweep + sparkle ─────────────────── */

function playSwell(ctx: AudioContext): void {
  const t   = ctx.currentTime;
  const out = ctx.createGain();
  out.gain.setValueAtTime(0.48, t);
  out.connect(ctx.destination);

  [261.63, 329.63, 392.0, 523.25].forEach((hz, i) => {
    const osc  = ctx.createOscillator();
    const filt = ctx.createBiquadFilter();
    const env  = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.value  = hz;
    osc.detune.value     = (i - 1.5) * 5;
    filt.type            = "lowpass";
    filt.frequency.setValueAtTime(180 + i * 60, t);
    filt.frequency.exponentialRampToValueAtTime(1600 + i * 120, t + 2.0);
    filt.Q.value = 0.55;
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(0.055, t + 0.22 + i * 0.06);
    env.gain.setValueAtTime(0.055, t + 2.2);
    env.gain.exponentialRampToValueAtTime(0.001, t + 4.2);
    osc.connect(filt); filt.connect(env); env.connect(out);
    osc.start(t); osc.stop(t + 4.5);
  });

  // Sparkle at ~1.8 s
  const sp = ctx.createOscillator();
  const sg = ctx.createGain();
  const sh = ctx.createBiquadFilter();
  sp.type = "triangle";
  sp.frequency.setValueAtTime(2093, t + 1.7);
  sp.frequency.exponentialRampToValueAtTime(4186, t + 2.3);
  sh.type = "highpass"; sh.frequency.value = 1800;
  sg.gain.setValueAtTime(0, t + 1.7);
  sg.gain.linearRampToValueAtTime(0.02, t + 1.95);
  sg.gain.exponentialRampToValueAtTime(0.001, t + 2.8);
  sp.connect(sh); sh.connect(sg); sg.connect(out);
  sp.start(t + 1.7); sp.stop(t + 3.0);
}

/* ─── Web Speech API — friendly female fallback ───────────────────────────── */

function pickFriendlyVoice(): SpeechSynthesisVoice | null {
  const vs = window.speechSynthesis.getVoices();
  for (const n of [
    "Google UK English Female",
    "Microsoft Zira Desktop",
    "Samantha",
    "Karen",
    "Moira",
    "Google US English",
  ]) {
    const v = vs.find(v => v.name.includes(n));
    if (v) return v;
  }
  return vs.find(v => v.lang.startsWith("en")) ?? null;
}

/* ─── FAQ — keyword-matched Q&A for the landing page bot ─────────────────── */

const FAQ: { kw: string[]; answer: string }[] = [
  { kw: ["hello","hi","hey","greet"],
    answer: "Hi there! I'm your Auto Heads guide. Ask me anything about the platform!" },
  { kw: ["register","sign up","create","join","start","get started"],
    answer: "Tap Get Started to create a free account — takes under a minute. You'll need an email address." },
  { kw: ["what","auto heads","platform","about","app","is this"],
    answer: "Auto Heads is Kenya's premier social marketplace for automotive enthusiasts — buy, sell, and showcase cars, bikes, and parts." },
  { kw: ["free","cost","price","pricing","charge","fee"],
    answer: "Browsing and listing are free. We take a small commission only on successful sales." },
  { kw: ["mpesa","m-pesa","payment","stripe","pay","money","transaction"],
    answer: "We support M-Pesa for Kenyan payments and Stripe for international cards. All transactions are fully secured." },
  { kw: ["login","sign in","account","log in","existing"],
    answer: "Already a member? Use the Login link to sign in. Once logged in, you'll have full access to your account." },
  { kw: ["support","contact","help","problem","issue","stuck"],
    answer: "Need help? Use the support form inside the app. Our team gets back to you within 24 hours." },
  { kw: ["sell","list","listing","upload","post"],
    answer: "To sell: log in, tap Upload, add photos and details of your vehicle or part, and publish. Buyers will find you instantly." },
  { kw: ["buy","purchase","find","search","browse"],
    answer: "Browse listings from the Feed — no account needed. Search by make, model, or location to find exactly what you want." },
  { kw: ["safe","secure","trust","scam","legit"],
    answer: "Auto Heads verifies sellers and uses escrow-style payment protection so your money is safe until you confirm receipt." },
];

const GREET = "How can I help you today?";

function matchFAQ(text: string): string {
  const lower = text.toLowerCase();
  for (const entry of FAQ) {
    if (entry.kw.some(k => lower.includes(k))) return entry.answer;
  }
  return "I can answer questions about Auto Heads — try asking about registration, payments, listings, or safety!";
}

/* ─── Component ──────────────────────────────────────────────────────────────  */

export default function LandingClient() {
  const [speaking,   setSpeaking]   = useState(false);
  const [botVisible, setBotVisible] = useState(false);
  const [botMsg,     setBotMsg]     = useState(GREET);
  const [listening,  setListening]  = useState(false);

  const ctxRef  = useRef<AudioContext | null>(null);
  const srcRef  = useRef<AudioBufferSourceNode | null>(null);

  /* ── Speak via ElevenLabs / Web Speech ─────────────────────────────────── */
  const speak = useCallback(async (text: string) => {
    try { srcRef.current?.stop(); } catch { /* ignore */ }
    srcRef.current = null;
    window.speechSynthesis?.cancel();

    const end = () => setSpeaking(false);
    const ctx = ctxRef.current;

    if (ctx) {
      try {
        const res      = await fetch(`/api/tts?text=${encodeURIComponent(text)}`);
        if (!res.ok) throw new Error("no-key");
        const arrayBuf = await res.arrayBuffer();
        const audioBuf = await ctx.decodeAudioData(arrayBuf);
        const src      = ctx.createBufferSource();
        const gain     = ctx.createGain();
        gain.gain.value = 0.88;
        src.buffer = audioBuf;
        src.connect(gain); gain.connect(ctx.destination);
        srcRef.current  = src;
        src.onended     = () => { setSpeaking(false); srcRef.current = null; };
        setSpeaking(true);
        src.start();
        return;
      } catch { /* fall through */ }
    }

    // Fallback: Web Speech API
    if (!window.speechSynthesis) return;
    const utt = new SpeechSynthesisUtterance(text);
    const v   = pickFriendlyVoice(); if (v) utt.voice = v;
    utt.rate   = 0.88; utt.pitch = 1.05; utt.volume = 0.9;
    utt.onstart = () => setSpeaking(true);
    utt.onend = end; utt.onerror = end;
    window.speechSynthesis.speak(utt);
  }, []);

  /* ── Page tap: unlock AudioContext + swell + greeting ──────────────────── */
  const handlePageTap = useCallback(() => {
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    else if (ctxRef.current.state === "suspended") ctxRef.current.resume();

    playSwell(ctxRef.current);
    const msg = GREET;
    setBotMsg(msg);
    setTimeout(() => speak(msg), 800);
  }, [speak]);

  /* ── Bot avatar tap: speak current message ─────────────────────────────── */
  const handleBotTap = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    else if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    speak(botMsg);
  }, [speak, botMsg]);

  /* ── Mic: listen → match FAQ → speak answer ────────────────────────────── */
  const handleMic = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    if (!SR) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rec: any = new SR();
    rec.lang           = "en-US";
    rec.continuous     = false;
    rec.interimResults = false;
    rec.onstart  = () => setListening(true);
    rec.onend    = () => setListening(false);
    rec.onerror  = () => setListening(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (ev: any) => {
      const transcript: string = ev.results?.[0]?.[0]?.transcript ?? "";
      const answer     = matchFAQ(transcript);
      setBotMsg(answer);
      // Init AudioContext on mic result if not yet created
      if (!ctxRef.current) ctxRef.current = new AudioContext();
      speak(answer);
    };
    try { rec.start(); } catch { setListening(false); }
  }, [speak]);

  /* ── Bot auto-appears after 1 s (no interaction needed) ────────────────── */
  useEffect(() => {
    const t = setTimeout(() => setBotVisible(true), 1000);
    return () => clearTimeout(t);
  }, []);

  /* ── Cleanup on unmount ─────────────────────────────────────────────────── */
  useEffect(() => {
    return () => {
      try { srcRef.current?.stop(); } catch { /* ignore */ }
      window.speechSynthesis?.cancel();
    };
  }, []);

  return (
    <main className={styles.wrapper} onClick={handlePageTap}>

      {/* ── Layer 1: Animated grid lines ─────────────────────────────── */}
      <div className={styles.verticalLines}   aria-hidden="true" />
      <div className={styles.horizontalLines} aria-hidden="true" />

      {/* ── Layer 2: Orbital rings (outermost = ring2, slow CW) ─────── */}
      <div className={styles.ringsContainer} aria-hidden="true">
        <div className={`${styles.ring} ${styles.ring2}`} />
        <div className={`${styles.ring} ${styles.ring3}`} />
        <div className={`${styles.ring} ${styles.ring4}`} />
        <div className={`${styles.ring} ${styles.ring5}`} />
        <div className={`${styles.ring} ${styles.ring6}`} />
        <div className={`${styles.ring} ${styles.ring7}`} />
        <div className={`${styles.shard} ${styles.shard1}`} />
        <div className={`${styles.shard} ${styles.shard2}`} />
        <div className={`${styles.shard} ${styles.shard3}`} />
        <div className={`${styles.shard} ${styles.shard4}`} />
      </div>

      {/* ── Layer 3: GET STARTED ignition button ─────────────────────── */}
      <div className={styles.buttonArea} onClick={e => e.stopPropagation()}>
        <div
          className={`${styles.speakRing} ${speaking ? styles.speakRingActive : ""}`}
          aria-hidden="true"
        />
        <div className={styles.outerAura} aria-hidden="true" />
        <div className={styles.chromeBezel} aria-hidden="true">
          <div className={styles.blueLedRing}>
            <Link
              href="/register"
              className={styles.innerButton}
              onMouseEnter={() => speak("Get Started")}
              aria-label="Get Started — Enter Auto Heads"
            >
              <span className={styles.getStartedText}>GET{"\n"}STARTED</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Layer 4: Voice bot — bottom-left, auto-appears after 1 s ── */}
      <div className={`${styles.botWrap} ${botVisible ? styles.botVisible : ""}`}>

        {/* Message bubble */}
        <div className={styles.botBubble} key={botMsg}>
          {botMsg}
        </div>

        {/* Horizontal waveform (idle heartbeat always, energetic when speaking) */}
        <div className={styles.botWaveform} aria-hidden="true">
          {[0,1,2,3,4,5,6].map(i => (
            <span
              key={i}
              className={speaking ? styles.waveBarSpeak : styles.waveBarIdle}
              style={{ animationDelay: `${i * 0.08}s` }}
            />
          ))}
        </div>

        {/* Avatar + mic */}
        <div className={styles.botControls}>
          <div
            className={styles.botAvatar}
            role="button"
            tabIndex={0}
            aria-label="Tap to hear message"
            onClick={handleBotTap}
            onKeyDown={e => e.key === "Enter" && handleBotTap(e as unknown as React.MouseEvent)}
          >
            🚗
          </div>
          <button
            type="button"
            className={`${styles.micBtn} ${listening ? styles.micListening : ""}`}
            onClick={handleMic}
            aria-label={listening ? "Listening…" : "Ask a question"}
          >
            🎤
          </button>
        </div>

      </div>

    </main>
  );
}
