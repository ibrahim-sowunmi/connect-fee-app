/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        'xxs': '0.65rem',
      },
      colors: {
        'stripe-purple': '#5167FC',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 