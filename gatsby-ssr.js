import React from 'react'
export { wrapRootElement } from './wrap-root-element'

const THEME = 'theme:dark'

// https://www.joshwcomeau.com/react/dark-mode/
const BlockingScript = () => {
  const codeToRunOnClient = `
  window.theme = {
    init: () => {
      window.theme.set(window.theme.current())
    },
    current: () => localStorage.getItem('${THEME}') === 'true',
    set: (to) => {
      document.documentElement.classList.toggle('dark', to);
      const result = document.documentElement.classList.contains('dark');
      localStorage.setItem('${THEME}', result);
      return result
    },
    toggle: () => window.theme.set(!window.theme.current())
  }

  window.theme.init();
  `
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />
}

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<BlockingScript key="themeScript" />)
}
