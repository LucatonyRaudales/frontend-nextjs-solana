module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},

    letterSpacing: {
      tightest: "-.075em",
      tighter: "-.05em",
      tight: "-.045em",
      normal: "0",
      wide: ".025em",
      wider: ".05em",
      widest: ".1em",
      widest: ".25em",
    },
  },
  plugins: [require("daisyui")],
};
