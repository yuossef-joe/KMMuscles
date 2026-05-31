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
        "muscle-black": "#050505",
        "deep-charcoal": "#111111",
        "gym-red": "#E21B2D",
        "energy-orange": "#FF6A00",
        "pure-white": "#FFFFFF",
        "light-gray": "#F5F5F5",
        "medium-gray": "#A3A3A3",
        "border-gray": "#2A2A2A",
        success: "#16A34A",
        warning: "#F59E0B",
        error: "#DC2626",
        info: "#2563EB"
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Impact", "Arial Narrow", "sans-serif"],
        body: ["var(--font-body)", "Arial", "sans-serif"]
      },
      maxWidth: {
        container: "1440px"
      },
      boxShadow: {
        glow: "0 0 42px rgba(226, 27, 45, 0.22)",
        card: "0 18px 50px rgba(0, 0, 0, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
