import React from "react";
import {useState} from "react";

import Layout from "../components/layout";
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

const Login = () => {

  const [login, setLogin] = useState({user_name: "", password: ""});
  const [user, setUser] = useState()
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
      <div>
        <ContainerDiv>
        <FlexDiv>
          <label css={css`width: 100px`} htmlFor="user_name">Username </label>
          <input id='user_name' type="text" value={login.user_name} onChange={captureLogin}/>
        </FlexDiv>
        </ContainerDiv>
        <ContainerDiv>
        <FlexDiv>
          <label css={css`width: 100px`} htmlFor="password">Password </label>
          <input id='password' type="password" value={login.password} onChange={captureLogin}/>
        </FlexDiv>
        </ContainerDiv>
        <ButtonDiv>
          <button css={css`width: 300px`} onClick={hitLogin}>Submit</button>
        </ButtonDiv>
      </div>
    </Layout>
  )
}

export default Login;
