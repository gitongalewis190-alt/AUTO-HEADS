"use client";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../../app/(auth)/auth.module.css";
import Link from "next/link";

/* ── Inline SVG Icons ──────────────────────────────────────── */

function IconEnvelope({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

function IconLock({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function IconEye({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconEyeOff({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function IconGoogle() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

/* ── Component ─────────────────────────────────────────────── */

type Mode = "login" | "forgot";

export function LoginForm() {
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  /* ── Handlers ── */

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/feed");
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code ?? "";
      if (
        code === "auth/user-not-found" ||
        code === "auth/wrong-password" ||
        code === "auth/invalid-credential"
      ) {
        setError("Incorrect email or password.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many attempts. Try again later or reset your password.");
      } else {
        setError("Sign in failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/feed");
    } catch {
      setError("Google sign-in failed.");
      setIsLoading(false);
    }
  };

  const handleGuest = async () => {
    setIsLoading(true);
    try {
      await signInAnonymously(auth);
      router.push("/feed");
    } catch {
      setIsLoading(false);
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setForgotSent(true);
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code ?? "";
      if (code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else {
        setError("Failed to send reset email.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Forgot Password Mode ── */

  if (mode === "forgot") {
    return (
      <div className={styles.panel}>
        <button
          type="button"
          onClick={() => setMode("login")}
          className={styles.btnGhost}
          style={{
            marginBottom: "16px",
            padding: "0",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <h1 className={styles.formTitle}>Reset password</h1>
        <p className={styles.formSubtitle}>
          Enter your email and we&apos;ll send a reset link
        </p>

        {forgotSent ? (
          <div className={styles.successBadge}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Reset link sent — check your inbox
          </div>
        ) : (
          <form onSubmit={handleForgot} noValidate>
            <div className={styles.fieldGroup}>
              <label htmlFor="forgot-email" className={styles.fieldLabel}>
                Email address
              </label>
              <div style={{ position: "relative" }}>
                <span className={styles.fieldIcon}>
                  <IconEnvelope />
                </span>
                <input
                  id="forgot-email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${styles.fieldInput} ${styles.fieldInputLeft}`}
                />
              </div>
            </div>

            {error && <p className={styles.globalError}>{error}</p>}

            <button
              type="submit"
              className={styles.btnPrimary}
              disabled={isLoading || !email}
            >
              {isLoading && <span className={styles.spinner} />}
              Send Reset Link
            </button>
          </form>
        )}

        <button
          type="button"
          onClick={() => setMode("login")}
          className={styles.btnGhost}
          style={{ marginTop: "16px" }}
        >
          Back to login
        </button>
      </div>
    );
  }

  /* ── Login Mode ── */

  return (
    <div className={styles.panel}>
      <h1 className={styles.formTitle}>Welcome back</h1>
      <p className={styles.formSubtitle}>Sign in to your Auto Heads account</p>

      <form onSubmit={handleLogin} noValidate>
        {/* Email */}
        <div className={styles.fieldGroup}>
          <label htmlFor="login-email" className={styles.fieldLabel}>
            Email address
          </label>
          <div style={{ position: "relative" }}>
            <span className={styles.fieldIcon}>
              <IconEnvelope />
            </span>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${styles.fieldInput} ${styles.fieldInputLeft}`}
            />
          </div>
        </div>

        {/* Password */}
        <div className={styles.fieldGroup}>
          <label htmlFor="login-password" className={styles.fieldLabel}>
            Password
          </label>
          <div style={{ position: "relative" }}>
            <span className={styles.fieldIcon}>
              <IconLock />
            </span>
            <input
              id="login-password"
              type={showPass ? "text" : "password"}
              autoComplete="current-password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.fieldInput}
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className={styles.fieldIconRight}
              aria-label={showPass ? "Hide password" : "Show password"}
            >
              {showPass ? <IconEyeOff /> : <IconEye />}
            </button>
          </div>
        </div>

        {/* Forgot link */}
        <div style={{ textAlign: "right", margin: "-8px 0 16px" }}>
          <button
            type="button"
            onClick={() => setMode("forgot")}
            className={styles.btnGhost}
            style={{ fontSize: "13px" }}
          >
            Forgot password?
          </button>
        </div>

        {/* Error */}
        {error && <p className={styles.globalError}>{error}</p>}

        <button
          type="submit"
          className={styles.btnPrimary}
          disabled={isLoading}
        >
          {isLoading && <span className={styles.spinner} />}
          Sign In
        </button>
      </form>

      <div className={styles.divider}>or</div>

      {/* Google */}
      <button
        type="button"
        onClick={handleGoogle}
        className={styles.googleBtn}
        disabled={isLoading}
      >
        <IconGoogle />
        Continue with Google
      </button>

      {/* Guest */}
      <div style={{ marginTop: "12px" }}>
        <button
          type="button"
          onClick={handleGuest}
          className={styles.guestBtn}
          disabled={isLoading}
        >
          <span aria-hidden="true">👁</span>
          Continue as Guest — browse without an account
        </button>
      </div>

      <p className={styles.authLink}>
        New to Auto Heads?{" "}
        <Link href="/register">Create account</Link>
      </p>
    </div>
  );
}
