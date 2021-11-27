import React from 'react'
import { Link } from '../components/Link'
import { H1 } from '../components/Headings'
import { Ol } from '../components/Lists'

import Layout from '../components/layout'

const pluralize = (singular, plural) => (count) =>
  `${count} ${count === 1 ? singular : plural}`

const pluralizePosts = pluralize('post', 'posts')

export default function Tags({ pageContext }) {
  const { posts, post, tag } = pageContext
  if (tag) {
    return (
      <Layout>
        <div className="space-y-16 mb-12">
          <H1 className="text-red-600 ">
            {pluralizePosts(post.length)} tagged with `{tag}`
          </H1>
          <Ol className="space-y-8">
            {post.map(({ id, frontmatter, excerpt, fields }) => (
              <li key={id}>
                <Link className="text-xl" to={fields.slug}>
                  {frontmatter.title}
                </Link>
                <p>
                  {excerpt}&nbsp;<Link to={fields.slug}>Read more</Link>
                </p>
              </li>
            ))}
          </Ol>
          <div className="flex flex-row-reverse justify-between">
            <Link to="/tags">&larr; Back to all tags</Link>
            {/* "Scroll to top" is a valid use for an empty href */}
            {/* eslint-disable-next-line */}
            <Link to="#">Scroll to top&nbsp;&uarr;</Link>
          </div>
        </div>
      </Layout>
    )
  }
  return (
    <Layout>
      <div className="space-y-16 mb-12">
        <H1 className="text-red-600">All tags</H1>
        <ul className="space-y-8">
          {Object.entries(posts).map(([tagName, articles]) => (
            <li key={tagName}>
              <Link to={`/tags/${tagName}`}>
                {tagName} ({pluralizePosts(articles.length)})
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-row-reverse justify-between">
          <Link to="/">&larr; Back to all posts</Link>
          {/* "Scroll to top" is a valid use for an empty href */}
          {/* eslint-disable-next-line */}
          <Link to="#">Scroll to top&nbsp;&uarr;</Link>
        </div>
      </div>
    </Layout>
  )
}
