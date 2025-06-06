import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight'
import mdAnchor from 'markdown-it-anchor'
import mdAttrs from 'markdown-it-attrs'
import { format } from 'date-fns'
import { exec } from 'node:child_process'

export default function (config) {
  config.addPlugin(syntaxHighlight, {
    preAttributes: {
      class: 'not-prose',
    },
  })

  config.amendLibrary('md', (mdLib) =>
    mdLib
      .use(mdAnchor, {
        level: [1, 2, 3],
        tabIndex: false,
        permalink: mdAnchor.permalink.linkInsideHeader({
          ariaHidden: true,
          class: 'permalink',
          symbol: '🔗',
          placement: 'before',
        }),
      })
      .use(mdAttrs)
  )

  config.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: '<!-- excerpt-end -->',
  })

  config.addWatchTarget('src/styles/*.css')

  // assets
  config.addPassthroughCopy('src/**/*.{jpg,jpeg,png,gif,js}')

  config.on('eleventy.after', async ({ runMode }) => {
    const extraArgs = runMode === 'build' ? '--minify' : ''
    // rebuild styles after every change
    await Promise.allSettled([
      exec(
        `npx @tailwindcss/cli -i ./src/styles/style.css -o ./_site/styles/style.build.css ${extraArgs}`
      ),
      exec(
        `npx @tailwindcss/cli -i ./src/styles/code.css -o ./_site/styles/code.build.css ${extraArgs}`
      ),
    ])
  })

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
    dir: {
      input: './src',
    },
  }
}
