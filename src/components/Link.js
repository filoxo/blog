import React from 'react'
import { Link as GatsbyLink } from 'gatsby'

const baseClasses =
  'text-red-600 hover:text-red-800 visited:text-red-900 no-underline'

export const Link = (props) => (
  <GatsbyLink
    {...props}
    className="text-red-600 hover:text-red-800 visited:text-red-900 no-underline"
  />
)
export const LinkButton = (props) => (
  <GatsbyLink {...props} className={`${baseClasses} border-2 py-1 px-3`} />
)
