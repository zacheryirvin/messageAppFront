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

  return (
    <Layout>
      <SEO title="Register" />
      <div>
        <ContainerDiv>
        <FlexDiv>
          <label css={css`width: 100px`} htmlFor="first_name">First Name </label>
          <input id='first_name' type="text" value={login.first_name} onChange={captureLogin}/>
        </FlexDiv>
        </ContainerDiv>
        <ContainerDiv>
        <FlexDiv>
          <label css={css`width: 100px`} htmlFor="last_name">Last Name </label>
          <input id='last_name' type="text" value={login.last_name} onChange={captureLogin}/>
        </FlexDiv>
        </ContainerDiv>
        <ContainerDiv>
        <FlexDiv>
          <label css={css`width: 100px`} htmlFor="user_name">Username </label>
          <input id='user_name' type="text" value={login.user_name} onChange={captureLogin} required/>
        </FlexDiv>
        </ContainerDiv>
        <ContainerDiv>
        <FlexDiv>
          <label css={css`width: 100px`} htmlFor="email">Email </label>
          <input id='email' type="text" value={login.email} onChange={captureLogin} required/>
        </FlexDiv>
        </ContainerDiv>
        <ContainerDiv>
        <FlexDiv>
          <label css={css`width: 100px`} htmlFor="password">Password </label>
          <input id='password' type="password" value={login.password} onChange={captureLogin} required/>
        </FlexDiv>
        </ContainerDiv>
        <ButtonDiv>
          <button css={css`width: 300px`} onClick={hitLogin}>Submit</button>
        </ButtonDiv>
      </div>
    </Layout>
  )
}

export default Signup;
