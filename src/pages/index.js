import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import PostPreview from '../components/post-preview'

const IndexPage = ({ data }) => {
  const { edges: posts } = data.allMdx
  return (
    <Layout>
      {posts
        .filter((post) => post.node.frontmatter.title)
        .map(({ node: post }) => (
          <PostPreview post={post} key={post.id} />
        ))}
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMM DD, YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
