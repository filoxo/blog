/*
For posterity: this was the original npm script I used but eventually got annoyed at it.
"post": "run(){ mkdir -p ./src/posts/$1 && touch ./src/posts/$1/index.mdx && echo \"---\ntitle: $1\ndate: 2020-MM-DD\ntags: []\n---\n\" >> ./src/posts/$1/index.mdx; }; run"
*/

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'url'

const args = process.argv.slice(2)

if (args.length < 1) {
  console.log('Usage: node create-post.js "<title>"')
  process.exit(1)
}

// https://www.geeksforgeeks.org/how-to-convert-a-string-into-kebab-case-using-javascript/
const slugify = (str) =>
  str
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1-$2') // "camelCase" to "kebab-case"
    .replace(/[\s_\/]+/g, '-') // Replace spaces, underscore, and slash with - (dash)
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
    .toLowerCase()

const title = args[0]
const titleSlug = slugify(title)
const todaysDate = new Date().toISOString().split('T')[0]

// Create content
const content = `---
title: ${title}
date: ${todaysDate}
tags: []
---

intro...

<!-- excerpt-end -->

contents
` // looks weird but its not a mistake

// Create post
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dir = path.join(__dirname, 'src/posts', titleSlug)
fs.mkdirSync(dir)
const index = path.resolve(dir, 'index.md')
fs.writeFileSync(index, content)

console.log(`Created post "${title}" in ${index}`)
