import React from 'react'
import { Link } from 'gatsby'

import styles from './post.module.css'
import {linkBtn} from '../components/link.module.css'

export default function PostPreview({ post }) {
  return (
    <div className={styles.post} key={post.id}>
      <h2 className={styles.title}>
        <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
      </h2>
      <div className={styles.date}>{post.frontmatter.date}</div>
      <div className={styles.prev}>
        <p>{post.excerpt}</p>
        <Link className={linkBtn} to={post.fields.slug}>
          Read more
        </Link>
      </div>
    </div>
  )
}
