import React from 'react'
import Helmet from 'react-helmet'
import site from '../site'
import BackIcon from 'react-icons/lib/io/ios-arrow-back'
import UpIcon from 'react-icons/lib/io/ios-arrow-up'

import Link from '../components/Link'
import Tags from '../components/Tags'

import '../css/blog-post.css'

const scrollToTop = function scrollTo() {
  var timeOut
  function scrollToTop() {
    if (
      document.body.scrollTop != 0 ||
      document.documentElement.scrollTop != 0
    ) {
      window.scrollBy(0, -50)
      timeOut = setTimeout(scrollToTop, 10)
    } else clearTimeout(timeOut)
  }
  scrollToTop()
}

export default function Template({ data, pathContext }) {
  const { markdownRemark: post } = data
  const { next, prev } = pathContext
  return (
    <div className="blog-post-container">
      <Helmet title={`${site.title} | ${post.frontmatter.title}`} />
      <div className="blog-post">
        <h2 className="title">{post.frontmatter.title}</h2>
        <div className="date">{post.frontmatter.date}</div>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <div className="tags">
          <Tags list={post.frontmatter.tags || []} />
        </div>
        <div className="navigation">
          <a className="link btn" href="/">
            <BackIcon />&nbsp;Back
          </a>
          <button type="button" className="link btn" onClick={scrollToTop}>
            Top&nbsp;<UpIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        tags
        title
      }
    }
  }
`
