import React from 'react'
import { Link } from '../Link'
import { H1 } from '../Headings'

export const PostHeading = (props) => {
  const isLink = Boolean(props.to)
  return (
    <H1 className="mb-4">
      {isLink ? (
        <Link {...props} />
      ) : (
        <span {...props} className="text-red-600" />
      )}
    </H1>
  )
}
