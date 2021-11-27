import React from 'react'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'

import Tags from './tags'
import { Link } from './Link'
import { H1 } from './Headings'

export const Post = ({ post }) => (
  <article className="mb-12">
    <H1 className="mb-4 text-red-600">{post.frontmatter.title}</H1>
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

export const PostPreview = ({ post }) => (
  <div>
    <H1 className="mb-4">
      <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
    </H1>
    <div className="text-red-600 mb-4">{post.frontmatter.date}</div>
    <p>
      {post.excerpt} <Link to={post.fields.slug}>Read more</Link>
    </p>
  </div>
)
