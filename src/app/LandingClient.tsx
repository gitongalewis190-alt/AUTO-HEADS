"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./landing.module.css";

// Web Speech API fallback — used only if ElevenLabs key is not configured.
function pickDeepVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  const preferred = [
    "Google UK English Male",
    "Microsoft Ryan Online (Natural)",
    "Microsoft David Desktop",
    "Daniel",
    "Alex",
  ];
  for (const name of preferred) {
    const v = voices.find(v => v.name.includes(name));
    if (v) return v;
  }
  return voices.find(v => v.lang.startsWith("en")) ?? null;
}

function wssSpeak(text: string, onStart: () => void, onEnd: () => void) {
  if (!window.speechSynthesis) { onEnd(); return; }
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  const voice = pickDeepVoice();
  if (voice) utt.voice = voice;
  utt.rate   = 0.80;
  utt.pitch  = 0.70;
  utt.volume = 0.90;
  utt.onstart = onStart;
  utt.onend   = onEnd;
  utt.onerror = onEnd;
  window.speechSynthesis.speak(utt);
}

export default function LandingClient() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const hasSpoken   = useRef(false);
  const audioRef    = useRef<HTMLAudioElement | null>(null);

  const speak = useCallback(async (text: string) => {
    // Cancel any in-progress audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    try {
      const res = await fetch(`/api/tts?text=${encodeURIComponent(text)}`);
      if (!res.ok) throw new Error("no-key");

      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onplay   = () => setIsSpeaking(true);
      audio.onended  = () => { setIsSpeaking(false); URL.revokeObjectURL(url); };
      audio.onerror  = () => { setIsSpeaking(false); URL.revokeObjectURL(url); };

      await audio.play();
    } catch {
      // ElevenLabs key not set — fall back to Web Speech API
      wssSpeak(text, () => setIsSpeaking(true), () => setIsSpeaking(false));
    }
  }, []);

  // Speak on the first user interaction — browsers require a gesture
  // before ANY audio (including speech synthesis) is allowed to play.
  useEffect(() => {
    const fire = () => {
      if (hasSpoken.current) return;
      hasSpoken.current = true;
      speak("Let's get started.");
    };
    document.addEventListener("pointerdown", fire, { once: true });
    document.addEventListener("keydown",     fire, { once: true });
    return () => {
      document.removeEventListener("pointerdown", fire);
      document.removeEventListener("keydown",     fire);
    };
  }, [speak]);

  return (
    <main className={styles.wrapper}>

      {/* ── Layer 1: Animated grid lines ─────────────────────────────── */}
      <div className={styles.verticalLines}   aria-hidden="true" />
      <div className={styles.horizontalLines} aria-hidden="true" />

      {/* ── Layer 2: Orbital rings + diagonal shards ──────────────────── */}
      <div className={styles.ringsContainer} aria-hidden="true">
        <div className={`${styles.ring} ${styles.ring1}`} />
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
      <div className={styles.buttonArea}>
        <div
          className={`${styles.speakRing} ${isSpeaking ? styles.speakRingActive : ""}`}
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

    </main>
  );
}
