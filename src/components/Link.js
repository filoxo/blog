import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import cls from 'classnames'

export const Link = (props) => (
  <GatsbyLink
    {...props}
    className={cls(
      'text-red-600 hover:text-red-700 no-underline transition-colors duration-300 ease-in-out',
      props.className
    )}
  />
)
