const postcss = require('eleventy-plugin-postcss')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const mdAnchor = require('markdown-it-anchor')
const { format } = require('date-fns')

module.exports = function (config) {
  config.addPlugin(postcss)
  config.addPlugin(syntaxHighlight, {
    preAttributes: {
      class: 'not-prose',
    },
  })

  config.amendLibrary('md', (mdLib) =>
    mdLib.use(mdAnchor, {
      level: [1, 2, 3],
      tabIndex: false,
      permalink: mdAnchor.permalink.linkInsideHeader({
        ariaHidden: true,
        class: 'permalink',
        symbol: '🔗',
        placement: 'before',
      }),
    })
  )

  config.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: '<!-- excerpt-end -->',
  })

  // assets
  config.addPassthroughCopy('src/**/*.{jpg,jpeg,png,gif,js}')

  /* Nunjucks config */
  // note: had to choose nunjucks filter specifically because universal filters don't yet seem to support filter arguments,
  // but nunjucks does and that's the configured engine
  config.addNunjucksFilter(
    'date',
    (dateStr, form = 'd MMM y') => format(dateStr, form) // https://date-fns.org/v2.29.3/docs/format
  )

  // this is just to easily filter out "posts" from collections.posts
  config.addNunjucksFilter('omit', (arr, val) => {
    if (!Array.isArray(arr))
      throw new Error('`omit` filter must be applied to an array!')
    if (!val) throw new Error('`omit` filter be given a value')
    return arr.filter(val)
  })

  return {
    dir: {
      input: './src',
    },
  }
}
