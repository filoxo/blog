import React, { useState, useEffect } from 'react'
import styles from './theme-toggle.module.css'

const THEME = 'dark-theme-enabled'

export default function ThemeToggle(props) {
  const [darkModeEnabled, setDarkModeEnabled] = useState(() => {
    return localStorage.getItem(THEME) === 'true'
  })

  useEffect(() => {
    localStorage.setItem(THEME, darkModeEnabled)
    document.body.classList.toggle('dark', darkModeEnabled)
  }, [darkModeEnabled])

  return (
    <button
      {...props}
      type="button"
      className={styles.themeToggle}
      aria-pressed={darkModeEnabled}
      aria-label="Toggle dark theme"
      onClick={() => setDarkModeEnabled(!darkModeEnabled)}
    ></button>
  )
}
