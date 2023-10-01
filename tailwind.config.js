/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#303841',
        'secondary': '#1F2328',
        'contrast': '#3A4750',
        'yellow': '#FF8200',
        'blue': '#3880D9',
        'white': '#EEEEEE',
      }
    },
  },
  plugins: [],
}

