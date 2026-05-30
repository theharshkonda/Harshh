import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070B17",
        mist: "#D8E8FF",
        neon: "#6EE7F9",
        salmon: "#FF8C6B",
        lime: "#D8F570",
        violet: "#8A7DFF",
        panel: "rgba(11, 17, 33, 0.72)",
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 80px rgba(110, 231, 249, 0.18)",
        panel: "0 30px 90px rgba(0, 0, 0, 0.3)",
      },
      backgroundImage: {
        noise:
          "radial-gradient(circle at 20% 20%, rgba(110, 231, 249, 0.12), transparent 30%), radial-gradient(circle at 80% 0%, rgba(138, 125, 255, 0.18), transparent 24%), radial-gradient(circle at 50% 80%, rgba(255, 140, 107, 0.16), transparent 25%)",
      },
      animation: {
        "float-slow": "floatSlow 10s ease-in-out infinite",
        "float-fast": "floatFast 7s ease-in-out infinite",
        grain: "grain 8s steps(8) infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        floatFast: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(10px,-12px,0)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0,0)" },
          "20%": { transform: "translate(-2%, 1%)" },
          "40%": { transform: "translate(1%, -1%)" },
          "60%": { transform: "translate(2%, 0)" },
          "80%": { transform: "translate(-1%, 2%)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
