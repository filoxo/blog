import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { Post } from '../components/Post'

const PostLayout = ({ data }) => {
  const post = data.mdx
  return (
    <Layout>
      <Post post={post} />
    </Layout>
  )
}

export default PostLayout

export const query = graphql`
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date(formatString: "DD MMM YY")
        tags
      }
    }
  }
`
