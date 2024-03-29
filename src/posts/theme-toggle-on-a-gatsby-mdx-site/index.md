---
title: Theme toggle on a Gatsby + MDX site
date: 2021-11-27
tags: ['javascript', 'react', 'gatsby', 'mdx']
---

I recently read [Josh Comeau's excellent article](https://www.joshwcomeau.com/react/dark-mode/) on how he was able to achieve a theme toggle on his Gatsby site. I find his solution to be excellent! However my Gatsby site is, for better or worse, pretty tied to MDX and React. I implemented a solution based on his for my current site theme. <!-- excerpt-end -->

## Prereq: Update libraries

Before I started this feature, I had to update my blog... and its about **2 years behind** 😬. This meant Gatsby & plugins needed two major version upgrades. While at it, I ditched CSS Modules for Tailwind and then refactored all the components to use these utility classes. With that out of the way...

## Step 1: Updating HTML in Gatsby

Using the Gatsby SSR `setPreBodyComponents` technique Josh described, my implementation just had slightly different code to run on the client so for brevity that's all I'll include.

```jsx
const codeToRunOnClient = `
  window.theme = {
    init: () => {
      window.theme.set(window.theme.current())
    },
    current: () => localStorage.getItem('theme:dark') === 'true',
    set: (to) => {
      document.documentElement.classList.toggle('dark', to);
      const result = document.documentElement.classList.contains('dark');
      localStorage.setItem('theme:dark', result);
      return result
    },
    toggle: () => window.theme.set(!window.theme.current())
  }    

  window.theme.init();
`;
```

My site doesn't have a problem with globals since I control the libraries used on my blog. Maybe I'll change this if it becomes a problem in the future.

I created following functions on a global `theme` object:

- `init` runs on the client to initialize the theme (aka make sure the html element has the right className) before the rest of HTML is rendered
- `current` returns the current theme state, which is stored in localStorage
- `set` toggles the class to the HTML element that controls the theme, and updates the localStorage state based on whether that was successful, and returns the current state for React to store/sync
- `toggle` is basically just a wrapper around `set` that negates the `current` value, for convenience

The `set` logic was useful because I was seeing behavior where the `classList.toggle` would actually fail to add the class for whatever reason. This approach ensured the state was always correct based on the dom.

## Step 2: Crossing the chasm

The helper functions are setup before any of the rest of the page so once React kicks in I simply wire it up to the ThemeToggle component:

```jsx
export default function ThemeToggle() {
  const [darkModeEnabled, setDarkModeEnabled] = useState(() =>
    window.theme.current(),
  );

  let handleThemeToggle = () => {
    setDarkModeEnabled(window.theme.toggle());
  };

  return (
    <label>
      <input
        type="checkbox"
        checked={darkModeEnabled}
        onChange={handleThemeToggle}
      />
    </label>
  );
}
```

Some code was omitted just to highlight the relevant parts. When the component mounts it syncs the `theme.current()` state, and onChange it calls `theme.toggle()` and updates local state.

### SSR

Gatsby won't let you forget about SSR! `window` is not defined when server-side rendering so we have to handle it by checking if we're in a browser environment and short circuiting if true.

```jsx
// Check if in browser environment
const isBrowser = typeof window !== 'undefined';

export default function ThemeToggle() {
  const [darkModeEnabled, setDarkModeEnabled] = useState(() => {
    // Short circuit if not in browser
    if (!isBrowser) return false;
    else return window.theme.current();
  });
  // ... rest of code
}
```

The rest of the code doesn't get executed on the server so it doesn't need updating.

### Step 3: Adding a toggle

Last step is to build the markup for the theme toggle. I found this great [Build a CSS only toggle switch using TailwindCSS](https://medium.com/front-end-weekly/build-a-css-only-toggle-switch-using-tailwindcss-d2739882934) article that was very well executed, built with accessibility and semantics in mind. I just copy-and-pasted the code and modified the colors and sizing.

That's it! I'm pretty happy with my site redesign, and this ThemeToggle was a huge bonus!
