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
        classroom: {
          50: "#2A9393",
          100: "#2E8989",
          200: "#307979",
          300: "#2F6A6A",
          400: "#2E5C5C",
          500: "#2B4F4F",
          600: "#284343",
          700: "#243838",
          800: "#1F2D2D",
          900: "#1A2323",
          950: "#171D1D"
        },
        gray: {
          100: "#d7dadc",
          200: "#afb5b9",
          300: "#868f95",
          400: "#5e6a72",
          500: "#36454f",
          600: "#2b373f",
          700: "#20292f",
          750: '#1d252a',
          800: "#161c20",
          900: "#0b0e10"
        },
        'dark': "rgb(0,0,0,0.2)",
        'black': '#040403',
      },
      fontFamily: {
        sans: '"Lato", sans-serif',
        serif: '"DM Serif Display", sans-serif',
        highlight: 'Montserrat, sans-serif',
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}

