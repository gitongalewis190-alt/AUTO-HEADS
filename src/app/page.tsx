import Link from "next/link";
import styles from "./landing.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AUTO HEADS — Where automotive passion meets commerce",
  description: "The premium social marketplace for automotive enthusiasts in Kenya.",
};

export default function LandingPage() {
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
        <div className={styles.outerAura} aria-hidden="true" />
        <div className={styles.chromeBezel} aria-hidden="true">
          <div className={styles.blueLedRing}>
            <Link href="/register" className={styles.innerButton}>
              <span className={styles.getStartedText}>GET{"\n"}STARTED</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Layer 4: Orange burn — screen-blended, cuts through button ── */}
      {/* mix-blend-mode: screen on .centerGlow makes it burn through all layers above */}
      <div className={styles.centerGlow} aria-hidden="true" />

      {/* ── Layer 5: AUTO HEADS branding (static) ────────────────────── */}
      <div className={styles.branding}>
        <h1 className={styles.logoText}>AUTO HEADS</h1>
        <p className={styles.tagline}>Where automotive passion meets commerce</p>
      </div>

      {/* ── Layer 6: Subtle nav links ─────────────────────────────────── */}
      <nav className={styles.bottomLinks}>
        <Link href="/login" className={styles.navLink}>Login</Link>
        <Link href="/feed"  className={styles.navLink}>View as Guest</Link>
      </nav>

    </main>
  );
}
