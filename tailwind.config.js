/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./_site/**/*.html'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
