import React from 'react'
import { Link } from './Link'
import { PostHeading } from './Post/Heading'

export default function PostPreview({ post }) {
  return (
    <div>
      <PostHeading to={post.fields.slug}>{post.frontmatter.title}</PostHeading>
      <div className="text-red-600 mb-4">{post.frontmatter.date}</div>
      <p>
        {post.excerpt} <Link to={post.fields.slug}>Read more</Link>
      </p>
    </div>
  )
}
