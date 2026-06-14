"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
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

/* ─── Component ────────────────────────────────────────────────────────────── */

export default function LandingClient() {
  const ctxRef = useRef<AudioContext | null>(null);

  const handlePageTap = useCallback(() => {
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    else if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    playSwell(ctxRef.current);
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

      {/* ── Layer 3: GET STARTED ignition button photo ───────────────── */}
      <div className={styles.buttonArea} onClick={e => e.stopPropagation()}>
        <div className={styles.outerAura} aria-hidden="true" />
        <div className={styles.chromeBezel} aria-hidden="true">
          <div className={styles.blueLedRing}>
            <Link
              href="/register"
              className={styles.innerButton}
              aria-label="Get Started — Enter Auto Heads"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/button.png"
                className={styles.buttonImage}
                alt="Get Started"
                draggable={false}
              />
            </Link>
          </div>
        </div>
      </div>

    </main>
  );
}
