import React from 'react'
import GatsbyLink from 'gatsby-link'
import Helmet from 'react-helmet'

import Link from '../components/Link'

import '../css/index.css'

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <div className="blog-posts">
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => {
          return (
            <div className="blog-post" key={post.id}>
              <h2 className="title">
                <GatsbyLink to={post.frontmatter.path}>
                  {post.frontmatter.title}
                </GatsbyLink>
              </h2>
              <div className="date">{post.frontmatter.date}</div>
              <div className="prev">
                <p>{post.excerpt}</p>
                <Link className="link btn" to={post.frontmatter.path}>
                  Read more
                </Link>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`
