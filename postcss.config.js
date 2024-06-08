module.exports = ({ env }) => ({
  plugins: {
    'postcss-import': {},
    autoprefixer: {},
    '@unocss/postcss': {},
    'postcss-csso': env === 'production' ? {} : false,
  },
})
