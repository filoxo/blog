import React from 'react'
import { Link } from 'gatsby'

import {
  post as postStyles,
  heading,
  title,
  date,
  prev,
} from './post.module.css'
import { linkBtn } from '../components/link.module.css'

export default function PostPreview({ post }) {
  return (
    <div className={postStyles}>
      <div className={heading}>
        <h2 className={title}>
          <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
        </h2>
        <div className={date}>{post.frontmatter.date}</div>
      </div>
      <div className={prev}>
        <p>{post.excerpt}</p>
        <Link className={linkBtn} to={post.fields.slug}>
          Read more
        </Link>
      </div>
    </div>
  )
}
