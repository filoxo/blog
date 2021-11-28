import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import { PostPreview } from '../components/Post'

const IndexPage = ({ data }) => (
  <Layout>
    <div className="space-y-16 mb-12">
      {data.allMdx.edges.map(({ node: post }) => (
        <PostPreview {...post} key={post.id} />
      ))}
    </div>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { title: { ne: null } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 200)
          id
          frontmatter {
            title
            date(formatString: "DD MMM YY")
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
