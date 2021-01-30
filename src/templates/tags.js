import React from 'react'
import { Link } from 'gatsby'
import { FaHome, FaTags } from 'react-icons/fa'

import Layout from '../components/layout'
import { link } from '../components/link.module.css'
import styles from '../components/post.module.css'

export default function Tags({ pageContext }) {
  const { posts, post, tag } = pageContext
  if (tag) {
    return (
      <Layout>
        <div
          className={styles.post}
          style={{ padding: 'var(--content-padding)' }}
        >
          <h1>
            {post.length} post{post.length === 1 ? '' : 's'} tagged with {tag}
          </h1>
          <ul>
            {post.map(({ id, frontmatter, excerpt, fields }) => {
              return (
                <li key={id}>
                  <h2>
                    <Link className={link} to={fields.slug}>
                      {frontmatter.title}
                    </Link>
                  </h2>
                  <p>{excerpt}</p>
                </li>
              )
            })}
          </ul>
          <Link className={link} to="/tags">
            <FaTags /> All tags
          </Link>
        </div>
      </Layout>
    )
  }
  return (
    <Layout>
      <div className="con">
        <h1>Tags</h1>
        <ul className="tags">
          {Object.keys(posts).map((tagName) => (
            <li key={tagName}>
              <Link className={link} to={`/tags/${tagName}`}>
                {tagName}
              </Link>
            </li>
          ))}
        </ul>
        <Link className={link} to="/">
          <FaHome /> All posts
        </Link>
      </div>
    </Layout>
  )
}
