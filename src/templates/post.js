import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Post from '../components/post'

export default ({ data }) => {
  const post = data.mdx
  return (
    <Layout>
      <Post post={post} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      code {
        body
      }
      frontmatter {
        title
        date(formatString: "MMM DD, YYYY")
        tags
      }
    }
  }
`
