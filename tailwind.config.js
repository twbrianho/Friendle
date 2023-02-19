/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        mono: ["Inconsolata", ...defaultTheme.fontFamily.mono],
      },
      width: {
        "76": "19rem",
      },
      height: {
        "screen-3/4": "75vh",
      },
    },
  },
  plugins: [],
}
