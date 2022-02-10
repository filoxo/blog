import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import cls from 'classnames'

const commonClasses =
  'text-red-500 hover:text-red-600 no-underline transition-colors duration-300 ease-in-out'

export const Link = (props) => (
  <GatsbyLink {...props} className={cls(commonClasses, props.className)} />
)

export const InlineLink = ({ href, ...props }) => {
  const isLocalLink = Boolean(href) && href.startsWith('/')
  const className = cls(
    commonClasses,
    'border-b	border-dashed border-current visited:border-red-900',
    props.className
  )

  return isLocalLink ? (
    <GatsbyLink to={href} {...props} className={className} />
  ) : (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a href={href} {...props} className={className} />
  )
}
