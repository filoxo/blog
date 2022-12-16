window.theme = {
  init: () => window.theme.set(window.theme.current()),
  current: () => localStorage.getItem(THEME) === 'true',
  set: (to) => {
    document.documentElement.classList.toggle('dark', to)
    const toggledState = document.documentElement.classList.contains('dark')
    localStorage.setItem(THEME, toggledState)
    return toggledState
  },
  toggle: () => window.theme.set(!window.theme.current()),
}
const THEME = 'theme:dark'
const toggle = document.getElementById('theme-toggle')
toggle.addEventListener('click', () => {
  window.theme.toggle()
})
toggle.checked = window.theme.init()
