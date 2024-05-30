---
title: z-index rule for UnoCSS
date: 2024-05-30
tags: [css, architecture]
---

i've developed an [unocss rule](https://unocss.dev/config/rules) for managing the z-index rules in a scalable way. unfortunately i feel like its still too early to introduce so i wanted to record it somewhere. <!-- excerpt-end --> i'll channel my inner antfu-spirit... but publishing as a package would actually take me like a week so in order to ship it fast, its all contained here in this post 👇

```ts
const Z_INDEX_LAYERS = {
  drawer: 5,
  menu: 5,
  modal: 10,
  // the patterns i understand as 'listbox' & 'tooltip' function similarly enough that they can share the same layer value
  listbox: 20,
  tooltip: 20,
  popover: 30,
} as const

/**
 * @desc this rule enforces z-index rules by groups, rather than by arbitrary number values.
 * this helps limit devs to sensible groupings and reasonable limits.
 *
 * allows the following classes:
 * - z-drawer
 * - z-menu
 * - z-modal
 * - z-listbox
 * - z-tooltip
 * - z-popover
 *
 * these are intended to be used either within small projects, as well as in larger design systems.
 * 
 * a number modifier is also supported as an escape hatch, useful in the case of two competing components being rendered at the same time;
 * such as two [Drawers](https://tailwindui.com/components/application-ui/overlays/slide-overs). The second drawer could use `z-drawer-1` to elevate its z-index value by one.
 * Another example is if two components in the same group are conflicting (a <Dropdown /> next to <Tooltip />, for example)
 */
export const zIndexRule = [
  /^zi-(drawer|modal|listbox|dropdown|popover)(-[1-9])?$/,
  match => {
    const [, group, level] = match
    let zIndex = Z_INDEX_LAYERS[group]
    if (!zIndex) throw new Error(`Invalid z-index group '${group}'`)
    if (isNaN(zIndex))
      throw new Error(`The z-index value for group '${group}' is not a number.`)
    if (level) zIndex += Number(level.substring(1))
    return { 'z-index': zIndex }
  },
]
```

i found inspiration for this solution after reading:

- https://dev.to/mimafogeus2/a-better-way-to-manage-z-indexes-1nf
- https://www.smashingmagazine.com/2021/02/css-z-index-large-projects/

ultimately though the best way to avoid z-index wars is to never join them. most elements that position over top of others get rendered as React Portals, and are outside of the application's dom root. this means that in theory, an `<App />` that renders a `<Modal />` which contains a `<Dropdown />` render ordered accordingly. i'd expect something like this represented in the dom:

```html
<div id="root"></div>
<react-portal>
  <div role="dialog">...</div>
</react-portal>
<react-portal>
  <ul role="listbox">...</ul>
</react-portal>
```

then also [ensure that app root is styled with `isolate`](https://www.joshwcomeau.com/css/stacking-contexts/) and then you're <span class="font-bold dark:text-yellow-400">golden</span> 🏆