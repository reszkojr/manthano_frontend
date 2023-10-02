/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lapis: {
          100: "#cde0e8",
          200: "#9bc2d1",
          300: "#69a3bb",
          400: "#3785a4",
          500: "#05668d",
          600: "#045271",
          700: "#033d55",
          800: "#022938",
          900: "#01141c"
        },
        teal: {
          100: "#cce6e9",
          200: "#9acdd3",
          300: "#67b4bc",
          400: "#359ba6",
          500: "#028290",
          600: "#026873",
          700: "#014e56",
          800: "#01343a",
          900: "#001a1d"
        },
        persian: {
          100: "#cceee1",
          200: "#99dcc3",
          300: "#66cba5",
          400: "#33b987",
          500: "#00a869",
          600: "#008654",
          700: "#00653f",
          800: "#00432a",
          900: "#002215"
        },
        thistle: {
          100: "#f6f5fa",
          200: "#eeeaf5",
          300: "#e5e0ef",
          400: "#ddd5ea",
          500: "#d4cbe5",
          600: "#aaa2b7",
          700: "#7f7a89",
          800: "#55515c",
          900: "#2a292e"
        },
        gray: {
          100: "#e5e5e5",
          200: "#cbcbcb",
          300: "#b1b1b2",
          400: "#979798",
          500: "#7d7d7e",
          600: "#646465",
          700: "#4b4b4c",
          800: "#323232",
          900: "#191919"
        },
        'black': '#040403',
      },
      fontFamily: {
        sans: '"Familjen Grotesk", sans-serif',
        serif: '"DM Serif Display", sans-serif',
        highlight: 'Montserrat, sans-serif',
      }
    },
  },
  plugins: [],
}

