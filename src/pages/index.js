import React, {useState, useEffect} from "react"
import { Link } from "gatsby"
import Header from '../components/header.js'
import {css} from '@emotion/core'

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import Friends from '../components/contacts.js'

const getUser = async () => {
  // const url = 'http://localhost:4000/users'
  const url = process.env.GATSBY_USERS_URL
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include'
  })
  const response = await res.json();
  return response
}

const IndexPage = ({location}) => {
  const [user, setUser] = useState(
    location.state
    ? location.state.user
    : null 
  );
  const string = JSON.stringify(user);
  useEffect(() => {
    if (location.state && user === undefined) {
      if (location.state.user === undefined) {
        const anon = async () => {
          const theUser = await getUser()
          setUser(theUser.user);
        }
        anon()
      } else {
        if (location.state) {
          setUser(location.state.user)
        } 
      }
    }
  }, [])

  // console.log(location.state)
  // console.log(user)
  return (
    <Layout>
      <Header user={user}/>
      <SEO title="Home" />
      { user != undefined 
        ? <Friends user={user}/>
          : <Link css={css`
          display: flex;
          width: 200px;
          height: 50px;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: black;
          font-size: 2.5rem;
          border-radius: 5px;
          padding: 5px;
          margin: 0 auto;
          margin-top: 15px;

          :hover {
          -webkit-transform: perspective(1px) translateZ(0);
          transform: perspective(1px) translateZ(0);
          box-shadow: 0 0 1px rgba(0, 0, 0, 0);
          -webkit-transition-duration: 0.3s;
          transition-duration: 0.3s;
          -webkit-transition-property: transform, color, background-color;
          transition-property: transform, color, background-color;
          -webkit-transform: scale(1.1);
          transform: scale(1.1);
          background-color: black;
          color: white;
          }
          `}
          to='/signUp'>Sign Up</Link>
      }
    </Layout>
  )
}

export default IndexPage
