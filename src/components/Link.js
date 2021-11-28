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

export const InlineLink = ({ href, ...props }) => {
  const isLocalLink = Boolean(href) && href.startsWith('/')
  const className = cls(
    'text-red-600 hover:text-red-700 no-underline transition-colors duration-300 ease-in-out border-b	border-dashed border-current visited:border-red-900',
    props.className
  )

  return isLocalLink ? (
    <GatsbyLink to={href} {...props} className={className} />
  ) : (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a href={href} {...props} className={className} />
  )
}
