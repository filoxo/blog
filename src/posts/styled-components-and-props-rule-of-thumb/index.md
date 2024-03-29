---
title: Styled components and props - a rule of thumb
date: 2020-05-18
tags: ['javascript', 'css']
---

A while ago, I wrote about an [improvement to using props in styled-components](/improve-your-styled-component-props-usage/). The TLDR; is "Avoid overusing props in styles and instead use proper DOM and ARIA states". I think this advice extends to all CSS-in-JS solutions. <!-- excerpt-end --> However, there are still cases where using props is unavoidable so I've landed on this rule-of-thumb:

<Aside warn>

Only use props that match a CSS property (eg. color, width, etc.), **not** DOM properties or HTML attributes.

</Aside>

Making CSS properties dynamic makes sense where some components need sensible default styles, but can be overriden based on context and usage. DOM properties and HTML attributes are typically used to store the current document state, and not using those values in dynamic styles yields improved performance, accessibility, and semantics.

```jsx
const MyButton = styled.button`
  background: lightgrey;
  ${({ width = 'auto' }) => `width: ${width};`}
  :disabled {
    opacity: 0.6;
  }
  &[aria-pressed] {
    background: darkgrey;
  }
`;
```

The code above shows how `width` is a prop available to a consumer of the button to provide a value if needed, and uses the `disabled` property and the `aria-pressed` attribute in a static way. This strikes a good balance that I think will make your styled-component styles much better.
