import React from 'react'
import { Link } from 'gatsby'
import { H1 } from '../Headings'

export const PostHeading = (props) => {
  const isLink = Boolean(props.to)
  return (
    <H1 className="mb-4">
      {isLink ? (
        <Link
          {...props}
          className="hover:text-red-600 visited:text-red-900 transition-colors duration-300 ease-in-out"
        />
      ) : (
        <span {...props} className="text-red-600" />
      )}
    </H1>
  )
}
