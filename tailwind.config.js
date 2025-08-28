/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionTimingFunction: {
        'wheel': 'cubic-bezier(0.23, 1, 0.32, 1)',
      }
    },
  },
  plugins: [],
}
