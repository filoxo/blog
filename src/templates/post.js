import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Post from '../components/post'

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <Post post={post}/>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMM DD, YYYY")
        tags
      }
    }
  }
`
