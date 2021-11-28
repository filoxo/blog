import React from 'react'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'

import { TagList } from './TagList'
import { Link } from './Link'
import { H1 } from './Headings'
import { JumpToTop } from './JumpToTop'

export const Post = ({ frontmatter, body }) => (
  <article className="mb-12">
    <H1 className="mb-4 text-red-600">{frontmatter.title}</H1>
    <div className="text-red-600 mb-4">{frontmatter.date}</div>
    <div className="space-y-6">
      <MDXRenderer>{body}</MDXRenderer>
      <footer className="space-y-12">
        <TagList list={frontmatter.tags} />
        <div className="flex flex-row-reverse justify-between">
          <Link to="/">&larr; Back to home</Link>
          <JumpToTop />
        </div>
      </footer>
    </div>
  </article>
)

export const PostPreview = ({ fields, frontmatter, excerpt }) => (
  <div>
    <H1 className="mb-4">
      <Link to={fields.slug}>{frontmatter.title}</Link>
    </H1>
    <div className="text-red-600 mb-4">{frontmatter.date}</div>
    <p>
      {excerpt} <Link to={fields.slug}>Read more</Link>
    </p>
  </div>
)
