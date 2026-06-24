import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        muted: "hsl(var(--muted))",
        primary: "hsl(var(--primary))",
        accent: "hsl(var(--accent))",
        danger: "hsl(var(--danger))",
        success: "hsl(var(--success))"
      },
      boxShadow: {
        glow: "0 22px 80px rgba(14, 165, 233, 0.22)",
        panel: "0 24px 60px rgba(15, 23, 42, 0.12)"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"]
      },
      keyframes: {
        pulseRing: {
          "0%": { transform: "scale(.75)", opacity: "0.8" },
          "100%": { transform: "scale(1.9)", opacity: "0" }
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" }
        }
      },
      animation: {
        pulseRing: "pulseRing 1.6s ease-out infinite",
        scan: "scan 4s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
