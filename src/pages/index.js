import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import { css } from "@emotion/react"
import { rhythm } from "../utils/typography"

const Home = ({ data }) => {
  return (
    <Layout>
      <div>
        <h1
          css={css`
            display: inline-block;
            border-bottom: 1px solid;
          `}
        >
          Amazing Pandas Eating Things
        </h1>
        <h4>{ data.allMarkdownRemark.totalCount } Posts</h4>
        { data.allMarkdownRemark.edges.map(({ node }) => {
          return (
            <div key={ node.id }>
              <Link
                to={node.fields.slug}
                css={css`
                  text-decoration: none;
                  color: inherit;
                `}
              >
                <h3
                  css={css`
                    margin-bottom: ${rhythm(1 / 4)};
                  `}
                >
                  { node.frontmatter.title }{" "}
                  <span
                    css={css`
                      color: #bbb;
                    `}
                  >
                    - { node.frontmatter.date }
                  </span>
                </h3>
                <p>{ node.excerpt }</p>
              </Link>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default Home

export const query = graphql`
  query {
      allMarkdownRemark(sort: {
          fields: [frontmatter___date], order:DESC
      })
      {
          edges {
              node {
                  frontmatter {
                      title
                      date
                  }
                  fields {
                      slug
                  }
                  excerpt
                  timeToRead
                  html
              }
          }
      }
  }
`