---
title: migrating to 11ty
tags: javascript
---

in typical bored developer fashion, i took these extra vacation days to update my blog. this post is my brain dump during this migration from gatsby to slinkity, which brings together 11ty & vite. wish me luck! <!-- excerpt-end --> this time i felt like even Gatsby was too hefty for what i need... and mdx has not proven to be as useful as i had hoped, so i'm going to drop it during this migration too. i'll still have to figure out how to work with 11ty, port my syntax highlighting theme, and rewrite any dynamic components. [tldr at the bottom](#tldr).

## getting started

i reviewed the slinkity tutorial and then the 11ty tutorial. the first major step was creating a collection from a `/posts` directory. i did so by adding `src/posts/posts.json` containing `"tags": "posts"`, i think this means everything inside of this directory will be tagged as "posts". Which then allows me to iterate over the collection in `src/index.md`.

next i created a `post.njk` layout to use with my post pages. i ported over what i could, and then added `"layout": "post.html"` to `src/posts/posts.json` so that each page in this directory would use this layout. nice!

at this point i notice that i will be able to replicate some of the react component structures from my old blog, using plain html partials and sprinkle in some interactivity with alpine. i got this idea from a different starter template and i hoped that by avoiding the shortcodes i'd avoid an extra feature that i don't plan to use.

## generating tags

i next took on migrating over the tags pages. these pages show a list of posts that are tagged with a term. retrieving the list was proving tricky at first-blush. i'm thinking... a collection? no, what i actually needed was to make [tag pages](https://www.11ty.dev/docs/quicktips/tag-pages/), and then link to those pages in the post template. I had gone down some rabbit holes thinking that I might need to make a "postsByTags" collection to iterate over, or a tag-list.html partial, or even to create a new layout + page. but its simpler than that: just create a tags.md that contains the whole layout. I might even go and to do this for the about page too. at this point, i started copying over the layout/classes/etc to match the old blog. started with the html + body, then the site header.

## migrating theme-toggle

i used Josh Comeaus' strategy for creating the theme toggle with react, but i chose to experiment with using alpine. at first i wondered if i could colocate the logic/state with the toggle's markup. what seems to align more is to keep the state where it'll be used (the html element) and then toggle it from an element within it.

so i did just that and everything worked great! the most significant change is that reading & setting the theme state doesn't happen now until after content load, which i don't mind and don't think i get enough readers to bother.

### simplifying alpine

at this point i ran tests to get an idea where things were performance-wise. i ran my site on a slow connection mobile device using google's lighthouse tool. i ran a prod build and served locally and found that i was getting consistetly low scores due to alpine taking time to download. its not even that big! even so, i replaced it with ~25 lines inlined into the html page. that alone boosted the perf score up to 99. i may need to extract this though as it is being processed by vite multiple times, rather than identified as the same script.

## migrating the rest of the posts

i've migrated the remaining posts but am now finding that the sort order of the posts collection isn't reversing as expected. this turned out to be due to a subtle nuance in the liquid templating... using the [`reverse` filter](https://shopify.github.io/liquid/filters/reverse/) eg. `\{\% for post in collections.posts | reverse %}` _did not work_ but [reversed](https://shopify.github.io/liquid/tags/iteration/#reversed) did eg. `\{\% for post in collections.posts reversed %}`. not sure i understand why still. also at one point i'd been misled by an error that i thought was invalid liquid syntax. a different error was because i hadn't escaped the characters in the example code in this paragraph.
at this point i struggled between 11ty's liquid syntax, nunjucks syntax that slinkity recommends, plain html examples that turned out to be processed using liquid instead of nunjucks despite being configured, and fixing a bunch of the slight syntax errors between flavors of markdown. along the way i also fixed some minor styling/layout issues, refined some missing classes, improved some layout items, and studied `@tailwind/typography`'s [prose API with element modifiers](https://tailwindcss.com/docs/typography-plugin#element-modifiers]) to style the blog contents. this took me a few hours, but i tackled these in chunks.

## vite plugin is not quite ready for my usecase

11ty supports vite via [@11ty/eleventy-plugin-vite](https://www.11ty.dev/docs/server-vite/). i experimented with installing this vite plugin inside of a different template that had a dual process setup. however, i was not able to get tailwind working... it would serve the main.css in development but wasn't being transformed, so tailwind was never loading. the production build _worked perfectly_; i just couldn't figure out how to get it working in dev.

## tldr

if you're looking for a static site generator, 11ty is great! if you're looking for a blog platform, slinkity is great!

### tradeoffs

the migration doesn't come without tradeoffs

- gatsby used graphql queries to access its document metadata, 11ty uses a standard API (collections) + the templating engine - the latter is simpler but for some reason much more difficult for my brain to connect
- gatsby still generated react apps per page (at least, it did for my blog for some reason); 11ty generates truly static html - i prefer totally static if possible and had thought gatsby did the same until i popped open my devtools one day
- slinkity uses nunjucks by default, while liquid is the default for 11ty. This is due to a single language feature in liquid that makes it hard to use with component shortcodes. unfortunate.
- i might not be as big of a fan of tailwind as i had thought... because the setup required specific syntax and import locations for it to work. i tested it and it appears that tailwind doesn't work with the 11ty plugin yet because vite wasn't transforming the css.
  - i've been contemplating adopting [picocss](https://picocss.com/) instead, which gives me a lot of interactivity for free by using semantic html. but then i have to redo the html/css structure... 😅 so for now it'll do
- [slinkity](https://slinkity.dev/) is a really well-designed package. the docs are very simple. i can see pretty easily where it and 11ty's apis apply/differ, and it worked very easily out of the box.
