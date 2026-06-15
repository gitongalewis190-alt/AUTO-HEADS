import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100svh",
        backgroundColor: "#0b0b12",
        overflow: "hidden",
      }}
    >
      {/* Orange orb — top right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(255,107,0,0.10) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Blue orb — bottom left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "-80px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(0,168,232,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Dot-grid overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "32px 16px",
          gap: "24px",
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-poppins), sans-serif",
              fontSize: "20px",
              fontWeight: 800,
              background: "linear-gradient(135deg, #FF6B00, #FFA500)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.04em",
            }}
          >
            AUTO
          </span>
          <span
            style={{
              fontFamily: "var(--font-poppins), sans-serif",
              fontSize: "20px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "0.04em",
            }}
          >
            HEADS
          </span>
        </Link>

        {children}
      </div>
    </div>
  );
}
