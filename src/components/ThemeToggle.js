import React, { useState } from 'react'

const isBrowser = typeof window !== 'undefined'

// https://medium.com/front-end-weekly/build-a-css-only-toggle-switch-using-tailwindcss-d2739882934
export default function ThemeToggle() {
  const [darkModeEnabled, setDarkModeEnabled] = useState(() => {
    if (!isBrowser) return false
    else return window.theme.current()
  })

  let handleThemeToggle = () => {
    window.theme.toggle()
    setDarkModeEnabled(window.theme.current())
  }

  return (
    <label className="relative flex justify-between items-center group">
      <input
        type="checkbox"
        className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-sm"
        checked={darkModeEnabled}
        onChange={handleThemeToggle}
      />
      <span className="w-8 h-5 flex items-center flex-shrink-0 ml-8 p-1 bg-gray-900 rounded-full duration-300 ease-in-out peer-checked:bg-red-600 after:w-4 after:h-4 after:bg-white peer-checked:after:bg-gray-900 after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-2"></span>
    </label>
  )
}
