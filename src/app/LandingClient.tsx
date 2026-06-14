"use client";

import Link from "next/link";
import styles from "./landing.module.css";

export default function LandingClient() {
  return (
    <main className={styles.wrapper}>
      <Link href="/register" className={styles.orbLink} aria-label="Get Started — Enter Auto Heads">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/button.png"
          className={styles.buttonImage}
          alt="Get Started"
          draggable={false}
        />
      </Link>
    </main>
  );
}
