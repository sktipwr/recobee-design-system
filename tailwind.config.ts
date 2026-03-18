import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          base: "#09090b",
          primary: colors.zinc[950],
          elevated: "rgba(24,24,27,0.4)",
          hover: "rgba(24,24,27,0.7)",
        },
        "rb-border": {
          subtle: "rgba(255,255,255,0.04)",
          DEFAULT: "rgba(255,255,255,0.06)",
          hover: "rgba(255,255,255,0.14)",
        },
        "rb-text": {
          primary: "#ffffff",
          secondary: colors.zinc[200],
          tertiary: colors.zinc[400],
          muted: colors.zinc[500],
          faint: colors.zinc[600],
        },
        accent: {
          DEFAULT: colors.amber[500],
          bg: "rgba(245,158,11,0.15)",
          border: "rgba(245,158,11,0.2)",
          text: colors.amber[300],
          hover: colors.amber[400],
        },
      },
      fontSize: {
        caption: ["11px", { lineHeight: "16px" }],
        "body-sm": ["12px", { lineHeight: "18px" }],
        body: ["13px", { lineHeight: "20px" }],
        "body-lg": ["15px", { lineHeight: "22px" }],
        "heading-sm": ["16px", { lineHeight: "24px" }],
        heading: ["20px", { lineHeight: "28px" }],
        "heading-lg": ["24px", { lineHeight: "32px" }],
        display: ["30px", { lineHeight: "36px" }],
      },
      borderRadius: {
        card: "16px",
        button: "12px",
      },
      boxShadow: {
        "card-hover": "0 12px 48px -12px rgba(0,0,0,0.6)",
        glow: "0 0 24px -6px rgba(245,158,11,0.15)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
