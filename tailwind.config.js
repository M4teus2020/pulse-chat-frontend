import PrimeUi from 'tailwindcss-primeui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [PrimeUi],
  darkMode: ['selector', '[class="p-dark"]'],
}
