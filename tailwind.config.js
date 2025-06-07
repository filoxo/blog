/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{njk,md,html,css}', './_site/**/*.html'],
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography')],
}
