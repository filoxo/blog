---
title: Tailwind not at odds with semantic class naming
date: 2024-11-06
tags: ['css']
---

i find that many devs feel they need to align absolutely with Tailwind, or BEM, or [insert design system here] ideologies. i really think this is a misundestanding of how to use all the tools in a frontend dev's toolbox. this leads me to this thesis: Tailwind is not at odds with semantic class naming.

<!-- excerpt-end -->

## define 'semantic class naming'

loosely, this refers to class names that are meaningful and descriptive of the element they are styling that the dev needs to memorize. ie. bootstrap's way of naming 'widget' components.

contrast this with Tailwind, where the class names are utility-based and map to the CSS properties they apply (mostly).

## so how do we use tailwind without being at odds with semantic class naming?

the answer is: we don't need to choose between them – use both! 🙀

out of the box, tailwind makes use of directives. i'd like to focus on one in particular: `@apply`. think of this as a function that aggregates a set of tw utilities into a single class. use whatever css naming you prefer. be sure to wear your design-system engineer hat for this.

# example 1: using `@apply` with semantic class naming

use `@apply` to create a semantic class that you can compose with other classes.

here's a snippet borrowed from Daisy UI's button component. [source on Github here](https://github.com/saadeghi/daisyui/blob/master/src/components/unstyled/button.css#L1-L19]).

```scss
.btn {
  @apply rounded-btn inline-flex h-12 min-h-[3rem] shrink-0 cursor-pointer select-none flex-wrap items-center justify-center border-transparent px-4 text-center;
  font-size: 0.875rem;
  line-height: 1em;
  /* disabled */
  &-disabled,
  &[disabled],
  &:disabled {
    @apply pointer-events-none;
  }

  /* shapes */
  &-square {
    @apply h-12 w-12 p-0;
  }
  &-circle {
    @apply h-12 w-12 rounded-full p-0;
  }
}
```

this gives you `.btn` class that you can modify with `.btn-square`, `.btn-circle`, etc. just be sure to tackle all edge cases, like if you need to support links as buttons.

# example 2: using `@apply` to create classless HTML components

inspired by the likes of [picocss.com](https://picocss.com/), we can also create a classless HTML framework that is powered by Tailwind. I used this technique to build [a Linktree clone i named `11tree`](https://github.com/filoxo/11tree/blob/main/src/styles/theme.css#L10-L31).

```scss
body {
  @apply text-slate-800 text-center bg-stone-50;
}
a,
button {
  @apply py-2 px-5 bg-emerald-900 leading-relaxed tracking-wider uppercase font-semibold text-sm text-white rounded-md shadow-md transition-colors duration-300 hover:bg-emerald-950 focus:outline-none focus:ring ring-offset-1 focus:ring-emerald-600 inline-block w-full text-center hover:enabled:cursor-pointer;
}
[type='button'] {
  @apply bg-emerald-900;
}
h1 {
  @apply text-4xl font-bold text-slate-800 text-center;
}
h2 {
  @apply text-3xl font-bold text-slate-800 text-center;
}
h3 {
  @apply text-2xl font-bold text-slate-800 text-center;
}
h4 {
  @apply text-xl font-bold text-slate-800 text-center;
}
```

this gives you a headstart to styling your document without needing anything extra while still being extensible. this also leverages semantic HTML concepts, and should resolve the concern for those who really hate memorizing class names.
