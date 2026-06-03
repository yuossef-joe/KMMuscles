import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "muscle-black": "#050505",
        "deep-charcoal": "#111111",
        "gym-red": "#E21B2D",
        "energy-orange": "#FF6A00",
        "light-gray": "#F5F5F5",
        "medium-gray": "#A3A3A3",
        "border-gray": "#2A2A2A",
        success: "#16A34A",
        warning: "#F59E0B",
        error: "#DC2626",
        info: "#2563EB"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
