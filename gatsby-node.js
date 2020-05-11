const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        
      allKenticoCloudItemBlog(sort: {fields: elements___date___datetime, order: DESC}) {
        nodes {
          elements {
            title {
              value
            }
            content {
              resolvedHtml
            }
            post_slug {
              value
            }
          }
        }
      }
    }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allKenticoCloudItemBlog.nodes

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.elements.post_slug.value,
      component: blogPost,
      context: {
        slug: post.elements.post_slug.value,
        previous,
        next,
      },
    })
  })
}

