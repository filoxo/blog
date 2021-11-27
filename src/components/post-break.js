import React from 'react'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'

import Tags from './tags'
import { Link } from './Link'
import { PostHeading } from './Post/Heading'

const Post = ({ post }) => (
  <article className="mb-12">
    <PostHeading>{post.frontmatter.title}</PostHeading>
    <div className="text-red-600 mb-4">{post.frontmatter.date}</div>
    <div className="space-y-6">
      <MDXRenderer>{post.body}</MDXRenderer>
      <footer className="space-y-12">
        <Tags list={post.frontmatter.tags} />
        <div className="flex justify-between">
          {/* "Scroll to top" is a valid use for an empty href */}
          {/* eslint-disable-next-line */}
          <Link to="#">Scroll to top&nbsp;&uarr;</Link>
          <Link to="/">&larr; Back to home</Link>
        </div>
      </footer>
    </div>
  </article>
)

export default Post
