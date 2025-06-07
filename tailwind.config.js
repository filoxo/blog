/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{njk,md,html,css}'],
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography')],
}
