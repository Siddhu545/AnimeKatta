/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // all JS/TS files in src
    "./public/index.html"         // optional but recommended
  ],
  theme: {
    extend: {
      animation: {
        "slide-in": "slideIn 0.3s ease-out",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
      },
      colors: {
        mhaGreen: "#2E7D32",
        mhaYellow: "#FFEB3B",
        mhaBlue: "#0D47A1",
        mhaRed: "#C62828",
        mhaDark: "#1A1A1A",
      },
      fontFamily: {
        hero: ["Bangers", "cursive"],
      },
    },
  },
  plugins: [],
}