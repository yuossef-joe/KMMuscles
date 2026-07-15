import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Vigor-inspired light identity
        paper: "#FFFFFF",
        ink: "#121212",
        "ink-soft": "#5A5A5A",
        surface: "#F3F3F3",
        "surface-2": "#EAEAEA",
        line: "#E5E5E5",
        "brand-red": "#E60012",
        "brand-blue": "#334FB4",
        // Legacy aliases repointed to the light identity so untouched classes stay coherent
        "muscle-black": "#121212",
        "deep-charcoal": "#1B1B1B",
        "gym-red": "#E60012",
        "energy-orange": "#334FB4",
        "pure-white": "#FFFFFF",
        "light-gray": "#F3F3F3",
        "medium-gray": "#8A8A8A",
        "border-gray": "#E5E5E5",
        success: "#16A34A",
        warning: "#F59E0B",
        error: "#DC2626",
        info: "#334FB4"
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Questrial", "Helvetica Neue", "Arial", "sans-serif"],
        body: ["var(--font-body)", "Helvetica Neue", "Arial", "sans-serif"]
      },
      maxWidth: {
        container: "1440px"
      },
      boxShadow: {
        glow: "0 10px 40px rgba(18, 18, 18, 0.10)",
        card: "0 6px 24px rgba(18, 18, 18, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
