const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `posts` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const createPostPages = new Promise((resolve, reject) => {
    graphql(`
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                tags
              }
              body
            }
          }
        }
      }
    `).then((result) => {
      const posts = {}
      /* Post pages */
      const postTemplate = path.resolve(`./src/templates/post.js`)
      result.data.allMdx.edges.forEach(({ node }) => {
        if (node.frontmatter.tags) {
          node.frontmatter.tags.forEach((tag) => {
            if (!posts[tag]) {
              posts[tag] = []
            }
            posts[tag].push(node)
          })
        }

        createPage({
          path: node.fields.slug,
          component: postTemplate,
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })
      })

      /* Tag pages */
      const tagTemplate = path.resolve(`./src/templates/tags.js`)

      createPage({
        path: '/tags',
        component: tagTemplate,
        context: {
          posts,
        },
      })

      Object.keys(posts).forEach((tag) => {
        const post = posts[tag]
        createPage({
          path: `/tags/${tag}`,
          component: tagTemplate,
          context: {
            posts,
            post,
            tag,
          },
        })
      })
      resolve()
    })
  })
  return Promise.all([createPostPages])
}
