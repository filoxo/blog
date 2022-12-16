/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['src/**/*.{njk,md,html}', '_site/**/*.html'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
