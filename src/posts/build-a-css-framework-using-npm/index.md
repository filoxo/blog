---
title: 'Building a CSS framework using npm'
date: 2017-02-14
tags: ['javascript', 'npm']
---

This last weekend I wanted to create a simple CSS framework that I can reuse for my own little projects. <!-- excerpt-end --> The end result is [Simple Style](https://github.com/filoxo/simple-style) (which is still a WIP as requirements come up). Surprisingly, using [npm as a build tool](https://medium.com/@dabit3/introduction-to-using-npm-as-a-build-tool-b41076f488b0#.5w4loc8uy) made it extremely easy to set up a dev environment. I'll review everything about the setup in this post for my own documentation, but hopefully can also serve as a clean, straightforward example.

I used [`yarn`](https://yarnpkg.com/en/) for this experiment instead of `npm` solely for the speed improvements. Fortunately, `yarn`'s commands all have their `npm` equivalents so don't get hung up on the differences.

This basic setup offers:

- Autoprefixing to support the 2 latest browsers
- Future CSS syntax usable today
- minification
- optimizations
- a quick and easy development setup to reflect changes on-the-fly

### Dev dependencies

Here are our initial development dependencies:

- [normalize.css](https://necolas.github.io/normalize.css/): so that all elements render consistently
- [PostCSS](https://github.com/postcss/postcss)'s CLI: to leverage its ecosystem of feature plugins
- [CSSnext](http://cssnext.io/): a PostCSS plugin that helps you to use the latest CSS syntax today. This way the code will be a little more future-proof. Additionally, CSSnext also includes [Autoprefixer](https://github.com/postcss/autoprefixer) as a dependency.
- `postcss-import`: used to pull in a css file that wasn't being preprocessed
- `cssnano`: minify and optimize output

Install using yarn (or the npm equivalent)

    yarn add -D normalize.css postcss-cli postcss-cssnext postcss-import cssnano

### PostCSS config

Create a json file that contains the config for PostCSS. The docs named it **options.json** but I choose **postcss.json** for better clarity. The comments below explain some keys.

```json
{
  // Enable plugins in order
  "use": ["postcss-import", "postcss-cssnext", "cssnano"],
  "input": "main.css",
  "output": "dist/main.css",
  // use locally installed plugins (eg. in node_modules)
  "local-plugins": true,
  // Enable sourcemaps
  "map": true,
  // CSSnext and cssnano both use autoprefixer, but for different features/purposes
  // see https://github.com/MoOx/postcss-cssnext/issues/323
  "postcss-cssnext": {
    "warnForDuplicates": false
  }
}
```

### CSS time

Go ahead and create **main.css** at the project root. The above config will output to **dist/**. Here's a quick sample to put into the file for now.

```css
@import ('normalize.css');

:root {
  --color-primary: blue;
  --color-secondary: red;
}
```

### Building

Use the postcss-cli with the config file passed in as an arg and save it as an npm script.

    "scripts": {
        "build": "node_modules/postcss-cli/bin/postcss -c postcss.json"
    }

Now you can simply run `yarn run build` and your css will be processed and output to **dist**. But we can still do better.

### Watch for changes

Enabling watch will auto-transform the css file on changes. Add another npm script, which is exactly the same as `build` but with the watch flag.

    "build:dev": "node_modules/postcss-cli/bin/postcss -c postcss.json -w"

### Livereload

You wouldn't develop a CSS framework without seeing it rendered on a page so let's create a test page for development. Create **index.html** at the project root and populate it with some HTML, and add a link to your **main.css** file.

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <link rel="stylesheet" href="/dist/main.css" />
  </head>
  <body>
    <main>Hello world</main>
  </body>
</html>
```

[`lr-http-server`](https://www.npmjs.com/package/lr-http-server) will reload on changes, as well as a functioning http server.

```sh
yarn add -D lr-http-server
```

And then register a new npm script for it

```json
"reload": "lr-http-server -p 3000"
```

### Composing scripts

We want the two above scripts to run in parallel so that if either the css or the html file changes the livereload server will do its job. [`npm-run-all`](https://www.npmjs.com/package/npm-run-all) with the `-p` (parallel) flag does this exactly.

```sh
yarn add -D npm-run-all
```

Join the two tasks together into a single npm script

```sh
"start": "npm-run-all -p build:dev reload"
```

And then run easily with

```sh
yarn start
```

### Done!

You're ready to keep going developing your styles inside **main.css**. Feel free to improve upon this as needed!
