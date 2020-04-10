/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import {Global, css} from '@emotion/core'
import emotionReset from 'emotion-reset'

import Header from "./header"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Global styles={css`
      ${emotionReset}
        box-sizing: border-box;
        margin: 0;
        margin-top: 1rem;
        html {
          font-size: 62.5%;
          width: 90%;
          margin: 0 auto;
          max-width: 800px;
        }
      `}
      />
      <div>{children}</div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
