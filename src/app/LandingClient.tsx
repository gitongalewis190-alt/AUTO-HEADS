"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./landing.module.css";

function pickDeepVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  const preferred = [
    "Google UK English Male",
    "Microsoft Ryan Online (Natural)",
    "Microsoft Guy Online (Natural)",
    "Microsoft David Desktop",
    "Microsoft David - English (United States)",
    "Daniel",
    "Alex",
  ];
  for (const name of preferred) {
    const v = voices.find(v => v.name.includes(name));
    if (v) return v;
  }
  return voices.find(v => v.lang.startsWith("en")) ?? null;
}

export default function LandingClient() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const hasSpoken = useRef(false);

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = pickDeepVoice();
    if (voice) utterance.voice = voice;
    utterance.rate  = 0.80;
    utterance.pitch = 0.70;
    utterance.volume = 0.90;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend   = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  // Browsers require a user gesture before speechSynthesis will play.
  // Listen for the very first interaction on the page, then speak once.
  useEffect(() => {
    const fire = () => {
      if (hasSpoken.current) return;
      hasSpoken.current = true;
      speak("Let's get started.");
    };

    // pointerdown covers both mouse click and touch tap
    document.addEventListener("pointerdown", fire, { once: true });
    // also catch keyboard navigation
    document.addEventListener("keydown", fire, { once: true });

    return () => {
      document.removeEventListener("pointerdown", fire);
      document.removeEventListener("keydown", fire);
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
