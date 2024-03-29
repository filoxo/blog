---
title: 'Improve your styled-component props usage'
date: 2019-11-30
tags: ['css', 'javascript']
---

I hadn't used styled-components until about a year ago when I started at my current job. I can't say its my favorite CSS-in-JS option for various reasons. One of those reasons is the pitfall of relying on props for styling, which can do a lot more damage than devs may realize. <!-- excerpt-end --> Take a look at this example:

```jsx
const Button = styled.button`
  background: steelblue;

  ${(props) =>
    (props.isDisabled || props.isLoading) &&
    `
  background: lightsteelblue;
  pointer-events: none;
`}
`;

const FormInput = styled.input`
  border: 3px solid dimgray;

  ${(props) => props.isInvalid && 'border-color: tomato;'}
`;
```

The problem here is somewhat subtle. Can you spot it?

## The component props are not providing semantic value to the rendered element

When used like this the props only cause the class name to change. The pure HTML/CSS equivalent would be something like `<button class="button disabled loading">` (though the output classNames from styled components are even less understandable `<button class="sc-aBcDe sc-fGhIj sc-kLmNo">`). This leads to some very interesting gotchas.

- Setting `pointer-events: none` through usage of `isDisabled` seems innocuous but this _does not disable the button correctly_! Disabled buttons 1) should not receive focus, and 2) should not respond to mouse or keyboard click events; but `pointer-events: none` only prevents mouse click events. A keyboard user will **still be able to interact with this button**, and a screenreader user will have **no idea that the button is disabled**.
- Similarly, the `<Button isLoading>` and the `<FormInput isValid/>` does not communicate the state of the control to assitive technology. This leaves those users in the dark as to what is happening when they're interacting with your application.

## Instead, render semantic markup and use as selectors

For example, `isDisabled` should instead be renamed to `disabled` which would then be propagated to the DOM as the [`disabled` attribute](https://www.w3.org/TR/2014/REC-html5-20141028/forms.html#concept-fe-disabled) on the button. The corresponding CSS could then be simplified to use the [`:disabled` CSS pseudoselector](https://developer.mozilla.org/en-US/docs/Web/CSS/:disabled).

`isLoading` can instead be used to set the [`aria-busy` role](https://www.w3.org/TR/wai-aria-1.0/states_and_properties#aria-busy), and `isValid` used to set the [`aria-invalid` role](https://www.w3.org/TR/wai-aria-1.0/states_and_properties#aria-invalid); then, use those roles as your selectors in your css!

```js
const StyledButton = styled.button`
  background: steelblue;

  &:disabled,
  &[aria-busy] {
    background: lightsteelblue;
  }
`;

const Button = ({ disabled, isLoading, ...props }) => (
  <StyledButton disabled={disabled} aria-busy={isLoading || null} {...props} />
);

const StyledFormInput = styled.input`
  border: 3px solid dimgray;

  &[aria-invalid='true'] {
    border-color: tomato;
  }
`;

const FormInput = ({ isValid, ...props }) => (
  <StyledFormInput aria-invalid={!isValid} {...props} />
);
```

The benefits of this new approach are:

- Accessiblity: the rendered markup and semantics are enhanced for keyboard and screen reader users
- Performance: the css would never need to be rerendered
- Portable: if in some future we stop using styled-components, we don't need to modify the css to remove props

This isn't to say that you should _never_ use props in styles (perhaps the topic of another post), but do think through how your user experience should work and ensure the proper semantics are in place before simply reaching through to props in your styled components.
