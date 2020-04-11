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
`
const ButtonDiv = styled('div')`
  text-align: center;
  margin: 0 auto;
  margin-top: 5px;
`

const Signup = () => {

  const [login, setLogin] = useState({first_name: "", last_name: "", user_name: "", email: "", password: ""});
  const captureLogin = (e) => {
    let copyLogin = {...login}
    const target = e.target.id
    const value = e.target.value
    copyLogin[target] = value;
    setLogin(copyLogin);
  }

  const hitLogin = async (e) => {
    // const url = 'http://localhost:4000/users/register';
    const url = `${process.env.GATSBY_USERS_URL}/register`
    const reset = {first_name: "", last_name: "", user_name: "", email: "", password: ""}
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
    console.log(response)
    if (response.status === 201) {
      const theState = await response.json()
      navigate('/login', {state: theState});
    } else {
      return response;
    }
  }

  const TheLabel = styled('label')`
    width: 100px;
    display: flex;
    align-items: center;
    font-size: 1.5rem;
  `

  return (
    <Layout>
      <SEO title="Register" />
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
          <TheLabel css={css`width: 100px`} htmlFor="first_name">First Name </TheLabel>
          <input id='first_name' type="text" value={login.first_name} onChange={captureLogin}/>
        </FlexDiv>
        </ContainerDiv>
        <ContainerDiv>
        <FlexDiv>
          <TheLabel css={css`width: 100px`} htmlFor="last_name">Last Name </TheLabel>
          <input id='last_name' type="text" value={login.last_name} onChange={captureLogin}/>
        </FlexDiv>
        </ContainerDiv>
        <ContainerDiv>
        <FlexDiv>
          <TheLabel css={css`width: 100px`} htmlFor="user_name">Username </TheLabel>
          <input id='user_name' type="text" value={login.user_name} onChange={captureLogin} required/>
        </FlexDiv>
        </ContainerDiv>
        <ContainerDiv>
        <FlexDiv>
          <TheLabel css={css`width: 100px`} htmlFor="email">Email </TheLabel>
          <input id='email' type="text" value={login.email} onChange={captureLogin} required/>
        </FlexDiv>
        </ContainerDiv>
        <ContainerDiv>
        <FlexDiv>
          <TheLabel css={css`width: 100px`} htmlFor="password">Password </TheLabel>
          <input id='password' type="password" value={login.password} onChange={captureLogin} required/>
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

export default Signup;
