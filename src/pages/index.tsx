// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Bio from "../components/bio"
import Card from "../components/card"
import { rhythm } from "../utils/typography"
import Post from "../components/post"

import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { nonExecutableDefinitionMessage } from "graphql/validation/rules/ExecutableDefinitions";


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
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


const BlogIndex = ({ data, location }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title
  //const posts = data.allMarkdownRemark.edges
  const posts = data.allKenticoCloudItemBlog.nodes;
  const classes = useStyles();

  let user = {
    name: "conork"
  }
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="CK Dev Blog" />
      
      <Bio />
      
      {posts.map(post => {
        const title = post.elements.title.value
        return (
          <article key={post.elements.post_slug.value}>
            <header>
              <h3>
                <Link style={titleStyle} to={post.elements.post_slug.value}>
                  {title}
                </Link>
              </h3>
              <small>{post.elements.date.value}</small>
            </header>
            <section>
              <p>
                {post.elements.description.value}
              </p>
              <div style={Object.assign (buttonStyle, flexJustifyCenter)}><a style={cleanLink} href="/life-insurance/life-insurance-calculator/family-protection-planner">Get a Quote</a></div>
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
let titleStyle = {
  fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '25px',
        color: '#333333',
        textDecoration: 'none',
}
let buttonStyle = {
  
    color: '#fff',
    height: '44px',
    width: '168px',
    background: '#23817A',
    borderRadius: '32px',
    fontWeight: 'bold',
    fontSize: '16px',
    border: 'none',
    alignItems: 'center',
    boxShadow: '0 0 1px rgba(0, 0, 0, 0)',
    overflow: 'hidden',
    fontFamily: 'Lato',
}
let cleanLink = {
  textDecoration: 'none !important',
  color: '#fff',
}

let flexJustifyCenter = {
  display: 'flex',
  justifyContent: 'center',
}