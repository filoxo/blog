const slinkity = require('slinkity')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const slugify = require('slugify')
const md = require('markdown-it')
const emoji = require('markdown-it-emoji')
const anchor = require('markdown-it-anchor')
const { format } = require('date-fns')

module.exports = function (config) {
  config.addPlugin(
    slinkity.plugin,
    slinkity.defineConfig({
      // optional: use slinkity.defineConfig
      // for some handy autocomplete in your editor
    })
  )

  const markdownLibrary = md({
    html: true,
  })
    .use(emoji)
    .use(anchor, {
      level: [1, 2, 3],
      slugify: (str) =>
        slugify(str, {
          lower: true,
          strict: true,
          remove: /["]/g,
        }),
      tabIndex: false,
      permalink: anchor.permalink.linkInsideHeader({
        ariaHidden: true,
        class: 'permalink',
        symbol: '🔗',
        placement: 'before',
      }),
    })

  config.setLibrary('md', markdownLibrary)

  config.addPlugin(syntaxHighlight, {
    preAttributes: {
      class: 'px-4 py-2 rounded-lg overflow-auto not-prose',
    },
  })

  config.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: '<!-- excerpt-end -->',
  })

  config.addPassthroughCopy('src/**/*.{jpg,jpeg,png,gif}')

  config.addFilter(
    'slug',
    (str) =>
      str &&
      slugify(str, {
        lower: true,
        strict: true,
        remove: /["]/g,
      })
  )

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
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: './src',
    },
  }
}
