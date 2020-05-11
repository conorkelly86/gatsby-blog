// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Bio from "../components/bio"
import { rhythm } from "../utils/typography"

type Data = {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMarkdownRemark: {
    edges: {
      node: {
        excerpt: string
        frontmatter: {
          title: string
          date: string
          description: string
        }
        fields: {
          slug: string
        }
      }
    }[]
  }
}

const BlogIndex = ({ data, location }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title
  //const posts = data.allMarkdownRemark.edges
  const posts = data.allKenticoCloudItemBlog.nodes;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="CK Dev Blog" />
      <Bio />
      {posts.map(post => {
        const title = post.elements.title.value
        return (
          <article key={post.elements.post_slug.value}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={post.elements.post_slug.value}>
                  {title}
                </Link>
              </h3>
              <small>{post.elements.date.value}</small>
            </header>
            <section>
              <p>
                {post.elements.description.value}
              </p>
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    
      allKenticoCloudItemBlog(sort: {fields: elements___date___datetime, order: DESC}) {
        nodes {
          elements {
            title {
              value
            }
            description {
              value
            }
            date {
              value(fromNow: true)
            }
            post_slug {
              value
            }
          }
        }
      }
    
    
  }
`
