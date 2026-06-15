"use client";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult,
} from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import styles from "../../app/(auth)/auth.module.css";
import Link from "next/link";

/* ── Password strength helper ──────────────────────────────── */

function passwordStrength(pw: string): {
  score: number;
  label: string;
  color: string;
  width: string;
} {
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  const capped = Math.min(4, s) as 0 | 1 | 2 | 3 | 4;
  return {
    score: capped,
    label: (["", "Weak", "Fair", "Good", "Strong"] as const)[capped],
    color: (["", "#FF4444", "#FF8800", "#FFD700", "#00D084"] as const)[capped],
    width: `${capped * 25}%`,
  };
}

/* ── Inline SVG Icons ──────────────────────────────────────── */

function IconUser() {
  return (
    <svg
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
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconAt() {
  return (
    <svg
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
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
    </svg>
  );
}

function IconEnvelope() {
  return (
    <svg
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

function IconLock() {
  return (
    <svg
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

function IconEye() {
  return (
    <svg
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

function IconEyeOff() {
  return (
    <svg
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

function IconPhone() {
  return (
    <svg
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#00D084"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function IconArrowLeft() {
  return (
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
  );
}

/* ── Step Indicator ────────────────────────────────────────── */

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className={styles.steps} aria-label={`Step ${current} of ${total}`}>
      {Array.from({ length: total }, (_, i) => {
        const num = i + 1;
        const cls =
          num < current
            ? `${styles.step} ${styles.stepDone}`
            : num === current
            ? `${styles.step} ${styles.stepActive}`
            : styles.step;
        return <div key={num} className={cls} />;
      })}
    </div>
  );
}

/* ── Main Component ────────────────────────────────────────── */

export function RegisterForm() {
  const router = useRouter();

  /* ── shared state ── */
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState("");

  /* ── step 1 ── */
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  /* ── step 2 ── */
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpTimer, setOtpTimer] = useState(0);
  const [confirmResult, setConfirmResult] = useState<ConfirmationResult | null>(null);

  /* ── step 3 ── */
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const recaptchaRef = useRef<InstanceType<typeof RecaptchaVerifier> | null>(null);

  /* ── OTP countdown ── */
  useEffect(() => {
    if (otpTimer <= 0) return;
    const id = setInterval(() => setOtpTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [otpTimer]);

  /* ── Step 1 validation ── */
  const validateStep1 = (): boolean => {
    const errs: Record<string, string> = {};
    if (displayName.trim().length < 2)
      errs.displayName = "Name must be at least 2 characters.";
    if (!/^[a-z0-9_]{3,30}$/.test(username))
      errs.username =
        "Username must be 3–30 characters: lowercase letters, numbers, underscores only.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Enter a valid email address.";
    if (password.length < 8)
      errs.password = "Password must be at least 8 characters.";
    if (confirmPassword !== password)
      errs.confirmPassword = "Passwords do not match.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError("");
    if (validateStep1()) {
      setStep(2);
    }
  };

  /* ── Send OTP ── */
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError("");
    setIsLoading(true);
    try {
      if (!recaptchaRef.current) {
        recaptchaRef.current = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          { size: "invisible" }
        );
      }
      const fullPhone = "+254" + phone.replace(/\s/g, "");
      const result = await signInWithPhoneNumber(
        auth,
        fullPhone,
        recaptchaRef.current
      );
      setConfirmResult(result);
      setOtpSent(true);
      setOtpTimer(60);
    } catch {
      setGlobalError("Failed to send SMS. Check the number and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Verify OTP ── */
  const handleVerifyOtp = async () => {
    const code = otp.join("");
    if (code.length < 6) {
      setGlobalError("Enter all 6 digits.");
      return;
    }
    if (!confirmResult) {
      setGlobalError("Session expired. Please resend the code.");
      return;
    }
    setIsLoading(true);
    try {
      await confirmResult.confirm(code);
      setStep(3);
    } catch {
      setGlobalError("Invalid code. Check and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Resend OTP ── */
  const handleResendOtp = async () => {
    setOtp(["", "", "", "", "", ""]);
    setGlobalError("");
    recaptchaRef.current = null;
    setOtpSent(false);
  };

  /* ── Complete registration ── */
  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      setGlobalError("Please accept the terms to continue.");
      return;
    }
    setGlobalError("");
    setIsLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, { displayName });
      router.push("/feed");
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code ?? "";
      if (code === "auth/email-already-in-use") {
        setGlobalError(
          "This email is already registered. Try signing in."
        );
      } else {
        setGlobalError("Account creation failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  /* ── OTP input handlers ── */
  const handleOtpChange = (val: string, idx: number) => {
    if (!/^[0-9]?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) {
      document.getElementById(`otp-${idx + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      document.getElementById(`otp-${idx - 1}`)?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (text.length === 6) {
      setOtp(text.split(""));
      document.getElementById("otp-5")?.focus();
    }
    e.preventDefault();
  };

  /* ── password strength ── */
  const strength = passwordStrength(password);

  /* ── STEP 1 ─────────────────────────────────────────────── */
  if (step === 1) {
    return (
      <div className={styles.panel}>
        <StepIndicator current={1} total={3} />

        <h1 className={styles.formTitle}>Create your account</h1>
        <p className={styles.formSubtitle}>
          Join Kenya&apos;s automotive community
        </p>

        <form onSubmit={handleStep1} noValidate>
          {/* Full Name */}
          <div className={styles.fieldGroup}>
            <label htmlFor="reg-name" className={styles.fieldLabel}>
              Full name
            </label>
            <div style={{ position: "relative" }}>
              <span className={styles.fieldIcon}>
                <IconUser />
              </span>
              <input
                id="reg-name"
                type="text"
                autoComplete="name"
                required
                placeholder="John Kamau"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className={`${styles.fieldInput} ${styles.fieldInputLeft} ${
                  errors.displayName ? styles.error : ""
                }`}
              />
            </div>
            {errors.displayName && (
              <p className={styles.fieldError}>{errors.displayName}</p>
            )}
          </div>

          {/* Username */}
          <div className={styles.fieldGroup}>
            <label htmlFor="reg-username" className={styles.fieldLabel}>
              Username
            </label>
            <div style={{ position: "relative" }}>
              <span className={styles.fieldIcon}>
                <IconAt />
              </span>
              <input
                id="reg-username"
                type="text"
                autoComplete="username"
                required
                placeholder="john_kamau"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                className={`${styles.fieldInput} ${styles.fieldInputLeft} ${
                  errors.username ? styles.error : ""
                }`}
              />
            </div>
            {username.length >= 3 && !errors.username && (
              <p className={styles.fieldPreview}>
                autoheads.co/@{username}
              </p>
            )}
            {errors.username && (
              <p className={styles.fieldError}>{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div className={styles.fieldGroup}>
            <label htmlFor="reg-email" className={styles.fieldLabel}>
              Email address
            </label>
            <div style={{ position: "relative" }}>
              <span className={styles.fieldIcon}>
                <IconEnvelope />
              </span>
              <input
                id="reg-email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${styles.fieldInput} ${styles.fieldInputLeft} ${
                  errors.email ? styles.error : ""
                }`}
              />
            </div>
            {errors.email && (
              <p className={styles.fieldError}>{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className={styles.fieldGroup}>
            <label htmlFor="reg-password" className={styles.fieldLabel}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <span className={styles.fieldIcon}>
                <IconLock />
              </span>
              <input
                id="reg-password"
                type={showPass ? "text" : "password"}
                autoComplete="new-password"
                required
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${styles.fieldInput} ${
                  errors.password ? styles.error : ""
                }`}
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
            {password.length > 0 && (
              <>
                <div className={styles.strengthBar}>
                  <div
                    className={styles.strengthFill}
                    style={{
                      width: strength.width,
                      backgroundColor: strength.color,
                    }}
                  />
                </div>
                <p
                  className={styles.strengthLabel}
                  style={{ color: strength.color }}
                >
                  {strength.label}
                </p>
              </>
            )}
            {errors.password && (
              <p className={styles.fieldError}>{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className={styles.fieldGroup}>
            <label htmlFor="reg-confirm" className={styles.fieldLabel}>
              Confirm password
            </label>
            <div style={{ position: "relative" }}>
              <span className={styles.fieldIcon}>
                <IconLock />
              </span>
              <input
                id="reg-confirm"
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                required
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`${styles.fieldInput} ${
                  errors.confirmPassword
                    ? styles.error
                    : confirmPassword && confirmPassword === password
                    ? styles.valid
                    : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className={styles.fieldIconRight}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <IconEyeOff /> : <IconEye />}
              </button>
              {confirmPassword && confirmPassword === password && (
                <span
                  style={{
                    position: "absolute",
                    right: "38px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                >
                  <IconCheck />
                </span>
              )}
            </div>
            {errors.confirmPassword && (
              <p className={styles.fieldError}>{errors.confirmPassword}</p>
            )}
          </div>

          {globalError && <p className={styles.globalError}>{globalError}</p>}

          <button type="submit" className={styles.btnPrimary}>
            Continue
          </button>
        </form>

        <p className={styles.authLink}>
          Already have an account?{" "}
          <Link href="/login">Sign in</Link>
        </p>
      </div>
    );
  }

  /* ── STEP 2 ─────────────────────────────────────────────── */
  if (step === 2) {
    const timerMin = Math.floor(otpTimer / 60);
    const timerSec = String(otpTimer % 60).padStart(2, "0");

    return (
      <div className={`${styles.panel} ${styles.stepContent}`}>
        <StepIndicator current={2} total={3} />

        <h1 className={styles.formTitle}>Verify your phone</h1>
        <p className={styles.formSubtitle}>
          We&apos;ll send a 6-digit code to confirm your number
        </p>

        {!otpSent ? (
          <form onSubmit={handleSendOtp} noValidate>
            <div className={styles.fieldGroup}>
              <label htmlFor="reg-phone" className={styles.fieldLabel}>
                Phone number
              </label>
              <div style={{ position: "relative" }}>
                <span className={styles.phonePrefix}>+254</span>
                <input
                  id="reg-phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  placeholder="7XX XXX XXX"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/[^0-9\s]/g, ""))
                  }
                  className={`${styles.fieldInput} ${styles.phoneInput}`}
                />
              </div>
              <p className={styles.fieldHint}>
                Enter your Kenyan mobile number without the country code.
              </p>
            </div>

            {/* Invisible reCAPTCHA mount point */}
            <div id="recaptcha-container" />

            {globalError && <p className={styles.globalError}>{globalError}</p>}

            <button
              type="submit"
              className={styles.btnPrimary}
              disabled={isLoading || phone.replace(/\s/g, "").length < 9}
            >
              {isLoading && <span className={styles.spinner} />}
              Send Code
            </button>
          </form>
        ) : (
          <div className={styles.stepContent}>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.45)",
                textAlign: "center",
                marginBottom: "16px",
              }}
            >
              Code sent to +254{phone}
            </p>

            {/* OTP boxes */}
            <div className={styles.otpWrap} onPaste={handleOtpPaste}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, idx)}
                  onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                  className={`${styles.otpBox} ${
                    digit ? styles.otpBoxFilled : ""
                  }`}
                  aria-label={`OTP digit ${idx + 1}`}
                />
              ))}
            </div>

            {/* Timer / resend */}
            <div className={styles.timer}>
              {otpTimer > 0 ? (
                <span className={styles.timerActive}>
                  Resend in {timerMin}:{timerSec}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className={styles.btnGhost}
                  style={{ fontSize: "13px" }}
                >
                  Resend code
                </button>
              )}
            </div>

            {globalError && (
              <p className={styles.globalError}>{globalError}</p>
            )}

            <button
              type="button"
              onClick={handleVerifyOtp}
              className={styles.btnPrimary}
              disabled={isLoading || otp.join("").length < 6}
              style={{ marginTop: "8px" }}
            >
              {isLoading && <span className={styles.spinner} />}
              Verify
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setStep(1)}
          className={styles.btnGhost}
          style={{
            marginTop: "16px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <IconArrowLeft />
          Back
        </button>
      </div>
    );
  }

  /* ── STEP 3 ─────────────────────────────────────────────── */
  return (
    <div className={`${styles.panel} ${styles.stepContent}`}>
      <StepIndicator current={3} total={3} />

      <h1 className={styles.formTitle}>Recovery setup</h1>
      <p className={styles.formSubtitle}>
        Set a recovery email in case you lose access
      </p>

      <form onSubmit={handleComplete} noValidate>
        {/* Recovery email */}
        <div className={styles.fieldGroup}>
          <label htmlFor="reg-recovery" className={styles.fieldLabel}>
            Recovery email
          </label>
          <div style={{ position: "relative" }}>
            <span className={styles.fieldIcon}>
              <IconShield />
            </span>
            <input
              id="reg-recovery"
              type="email"
              autoComplete="off"
              placeholder="backup@example.com"
              value={recoveryEmail}
              onChange={(e) => setRecoveryEmail(e.target.value)}
              className={`${styles.fieldInput} ${styles.fieldInputLeft} ${
                recoveryEmail && recoveryEmail === email ? styles.error : ""
              }`}
            />
          </div>
          {recoveryEmail && recoveryEmail === email ? (
            <p className={styles.fieldError}>
              Recovery email must be different from your login email.
            </p>
          ) : (
            <p className={styles.fieldHint}>
              This is different from your login email. Used only for account
              recovery.
            </p>
          )}
        </div>

        {/* Terms */}
        <div className={styles.checkboxRow}>
          <input
            id="reg-terms"
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className={styles.checkbox}
          />
          <label htmlFor="reg-terms" className={styles.checkboxLabel}>
            I agree to the Auto Heads{" "}
            <Link href="/terms">Terms of Service</Link> and{" "}
            <Link href="/privacy">Privacy Policy</Link>
          </label>
        </div>

        {globalError && <p className={styles.globalError}>{globalError}</p>}

        <button
          type="submit"
          className={styles.btnPrimary}
          disabled={
            isLoading ||
            !termsAccepted ||
            (recoveryEmail.length > 0 && recoveryEmail === email)
          }
        >
          {isLoading && <span className={styles.spinner} />}
          Create Account
        </button>
      </form>

      <button
        type="button"
        onClick={() => setStep(2)}
        className={styles.btnGhost}
        style={{
          marginTop: "16px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <IconArrowLeft />
        Back
      </button>
    </div>
  );
}
