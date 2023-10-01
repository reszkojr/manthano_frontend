/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lapis': '#05668D',
        'teal': '#028290',
        'persian': '#00A869',
        'thistle': '#D4CBE5',
        'black': '#040403',
        'gray': '#7D7D7E'
      },
      fontFamily: {
        sans: '"Familjen Grotesk", sans-serif',
        serif: '"DM Serif Display", sans-serif',
      }
    },
  },
  plugins: [],
}

