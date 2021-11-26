import React from 'react'
import { PostHeading } from './Heading'
import { Link } from '../Link'

export const PostPreview = ({ frontmatter, excerpt, fields }) => {
  return (
    <div className="space-y-4">
      <PostHeading to={fields.slug}>{frontmatter.title}</PostHeading>
      <div className="text-red-600 mb-4">{frontmatter.date}</div>
      <p>{excerpt}</p>
      <div>
        <Link to={fields.slug}>Read more</Link>
      </div>
    </div>
  )
}
