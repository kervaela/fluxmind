/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        flux: { bg: "#0c0a1a", panel: "#16122a", line: "#2d2650" },
        violet: { glow: "#a78bfa", deep: "#6d28d9" },
        mint: { glow: "#5eead4" },
      },
      animation: {
        pulseSlow: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
