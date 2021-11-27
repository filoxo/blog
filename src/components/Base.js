import React from 'react'
import cls from 'classnames'

// This base class is to apply classNames to elements for MDX rendering
// The syntax helps Tailwind be able to find the correct classNames and not purge them
export const Base = ({ as: C, className, forwardedProps }) => (
  <C {...forwardedProps} className={cls(className, forwardedProps.className)} />
)
