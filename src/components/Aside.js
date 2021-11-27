import React from 'react'
import cls from 'classnames'

export const Aside = ({ info, warn, ...props }) => (
  <aside
    {...props}
    className={cls(
      'pl-4 font-bold mt-2 border-l-4 text-black dark:text-white',
      {
        'border-red-600': !info && !warn,
        'border-blue-400': info,
        'border-yellow-400': warn,
      }
    )}
  />
)
