/** @type {import('postcss-load-config').Config} */
const config = ({ env }) => ({
  plugins: {
    'postcss-import': {},
    autoprefixer: {},
    '@unocss/postcss': {},
    'postcss-csso': env === 'production' ? {} : false,
  },
})

export default config
