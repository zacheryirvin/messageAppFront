import React from "react";
import {useState} from "react";

import Layout from "../components/layout";
import Header from "../components/header.js"
import SEO from "../components/seo";
import styled from '@emotion/styled';
import {Link, navigate} from 'gatsby';
import {css, jsx} from '@emotion/core';

const ContainerDiv = styled('div')`
  width: 300px;
  margin: 0 auto;
`
const FlexDiv = styled('div')`
  display: flex;
  margin-top: 5px;
  margin-bottom: 5px;
`
const ButtonDiv = styled('div')`
  text-align: center;
  margin: 0 auto;
  margin-top: 5px;
`

const Login = () => {

  const [login, setLogin] = useState({user_name: "", password: ""});
  const captureLogin = (e) => {
    let copyLogin = {...login}
    const target = e.target.id
    const value = e.target.value
    copyLogin[target] = value;
    setLogin(copyLogin);
  }

  const hitLogin = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:4000/users/login';
    //const url = `${process.env.GATSBY_USERS_URL}/login`
    const reset = {user_name: "", password: ""}
    const res = await fetch(url, {
      headers: {
        Accept: '*',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(login)
    })
    setLogin(reset);
    const response = await res; 
    // return response;
    if (response.status === 200) {
      const theState = await response.json()
      navigate('/', {state: theState});
    } else {
      return response;
    }
  }

  return (
    <Layout>
      <SEO title="Login" />
      <Header/>
      <div css={css`
        border: 2px solid black;
        border-radius: 5px;
        width: 300px;
        margin: 0 auto;
        margin-top: 25px;
        padding: 20px;
        `}>
        <ContainerDiv>
        <FlexDiv>
          <label css={css`
            width: 100px;
            display: flex;
            align-items: center;
            font-size: 1.5rem;
          `} htmlFor="user_name">Username </label>
          <input id='user_name' type="text" value={login.user_name} onChange={captureLogin}/>
        </FlexDiv>
        </ContainerDiv>
        <ContainerDiv>
        <FlexDiv>
          <label css={css`
            width: 100px;
            display: flex;
            align-items: center;
            font-size: 1.5rem;
            `} htmlFor="password">Password </label>
          <input id='password' type="password" value={login.password} onChange={captureLogin}/>
        </FlexDiv>
        </ContainerDiv>
        <ButtonDiv>
          <button css={css`
            width: 300px;
            background-color: white;
            border: 1px solid black;
            border-radius: 5px;
            font-family: Roboto;
            padding: 5px;
            font-size: 2rem;
            font-weight: bold;

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
            cursor: pointer;
            }
            `} onClick={hitLogin}>Submit</button>
        </ButtonDiv>
      </div>
    </Layout>
  )
}

export default Login;
