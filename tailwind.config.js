/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [require('nativewind/preset')], // <-- Add this line
  theme: {
    extend: {
      colors: {
        primary : {
          DEFAULT: require('tailwindcss/colors').emerald[500],
          light:require('tailwindcss/colors').emerald[400],
          dark: require('tailwindcss/colors').emerald[600],
        },
      }
    },
  },
  plugins: [],
};