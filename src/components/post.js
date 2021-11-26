import React from 'react'
import { IoIosArrowBack, IoIosArrowUp } from 'react-icons/io'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'

import Tags from './tags'
import {
  post as postStyles,
  heading,
  title,
  date,
  content,
  tags,
  navigation,
} from './post.module.css'
import { linkBtn } from './link.module.css'

const Post = ({ post }) => (
  <div className={postStyles}>
    <div className={heading}>
      <h2 className={title}>{post.frontmatter.title}</h2>
      <div className={date}>{post.frontmatter.date}</div>
    </div>
    <div className={content}>
      <MDXRenderer>{post.body}</MDXRenderer>
    </div>
    {post.frontmatter.tags && post.frontmatter.tags.length && (
      <div className={tags}>
        <Tags list={post.frontmatter.tags} />
      </div>
    )}
    <div className={navigation}>
      <a className={linkBtn} href="/">
        <IoIosArrowBack />
        &nbsp;Back
      </a>
      {/* "Scroll to top" is a valid use for an empty href */}
      {/* eslint-disable-next-line */}
      <a className={linkBtn} href="#">
        Top&nbsp;
        <IoIosArrowUp />
      </a>
    </div>
  </div>
)

export default Post
