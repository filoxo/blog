const slinkity = require('slinkity')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const { format } = require('date-fns')

module.exports = function (config) {
  config.addPlugin(syntaxHighlight, {
    preAttributes: {
      class: 'px-4 py-2 rounded-lg overflow-auto not-prose',
    },
  })

  config.addPlugin(
    slinkity.plugin,
    slinkity.defineConfig({
      // optional: use slinkity.defineConfig
      // for some handy autocomplete in your editor
    })
  )

  config.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: '<!-- excerpt-end -->',
  })

  config.addPassthroughCopy('src/**/*.{jpg,jpeg,png,gif}')

  // note: had to choose nunjucks filter specifically because universal filters don't yet seem to support filter arguments,
  // but nunjucks does and that's the configured engine
  config.addNunjucksFilter(
    'date',
    (dateStr, form = 'd MMM y') => format(dateStr, form) // https://date-fns.org/v2.29.3/docs/format
  )

  return {
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: './src',
    },
  }
}
