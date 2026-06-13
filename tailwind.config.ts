import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F0F0F",
        surface: "#1A1A1A",
        accent: "#FF6B00",
        secondary: "#00A8E8",
        success: "#00D084",
        warning: "#FFA500",
        error: "#FF4444",
        "text-primary": "#FFFFFF",
        "text-muted": "#888888",
        glass: {
          fill: "rgba(255,255,255,0.08)",
          border: "rgba(255,255,255,0.15)",
        },
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        caption: "12px",
        "body-sm": "14px",
        body: "16px",
        "body-lg": "18px",
        h4: "14px",
        h3: "20px",
        h2: "28px",
        h1: "40px",
        display: "56px",
      },
      backdropBlur: {
        glass: "12px",
      },
      borderRadius: {
        glass: "16px",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 8px #FF6B00" },
          "50%": { boxShadow: "0 0 24px #FF6B00, 0 0 48px #FF6B00" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
