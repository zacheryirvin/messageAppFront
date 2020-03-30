import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Friends from '../components/contacts.js'

const IndexPage = ({location}) => {
  console.log(location.state)
  return (
    <Layout>
      <SEO title="Home" />
      <Friends />
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage
