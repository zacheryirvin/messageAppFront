import { Link } from "gatsby";
import styled from '@emotion/styled';
import {css, jsx} from '@emotion/core';
import PropTypes from "prop-types";
import React, {useState} from "react";

const activeLink = {
  border: "5px solid black",
  borderRadius: "5px"
}

const NavLink = styled(Link)`
  margin-right: 10px;
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 2.5rem;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;

  :hover {
  display: inline-block;
  vertical-align: middle;
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

  @media(max-width: 500px) {
    font-size: 1.8rem;
  }

`


const Header = (props) => {
  const user = props.user
  const logout = async () => {
    // const url = `http://localhost:4000/users/logout`
    const url = `${process.env.GATSBY_USERS_URL}/logout`
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include'
    })
    const response = await res.json()
    return response;

}
  return (
    <header>
      {user != undefined
          ? (
            <div css={css`display: flex; flex-wrap: wrap;`}>
              <div css={css`
                display: flex;
                justify-content: left;
                width: 49%;
              `}>
              <NavLink activeStyle={activeLink}
                to='/userList' state={{user: props.user}}>Users</NavLink>
                <NavLink activeStyle={activeLink} css={css`
                  @media(min-width: 501px) {
                  display: none;
                }
                  `}
                  to='/pending' state={{user: props.user}}>Pending</NavLink>
              </div>
              <div css={css`
                display: flex;
                justify-content: flex-end;
                width: 51%;
              `}>
                <NavLink activeStyle={activeLink} to='/' state={{user: props.user}}>Home</NavLink>
                <NavLink activeStyle={activeLink} css={css`margin-right: 0px;`} to='/login/' onClick={logout}> Logout</NavLink>
                <NavLink activeStyle={activeLink} css={css`display: none`} to='/login/'>Login</NavLink>
              </div>
              <div css={css`
                height: 5px;
                width: 100%;
                background-color: black;
                border-radius: 5px;
                margin-top: 5px;
                `}></div>
            </div>
            ) 
          : (
            <div css={css`display: flex; flex-wrap: wrap;`}>
              <div css={css`
                display: flex;
                justify-content: flex-start;
                width: 49%;
              `}>
                <NavLink activeStyle={activeLink} to='/userList' state={{user: props.user}}>Users</NavLink>
              </div>
              <div css={css`
                display: flex;
                justify-content: flex-end;
                width: 51%;
              `}>
                <NavLink activeStyle={activeLink} to='/' state={{user: props.user}}>Home</NavLink>
                <NavLink activeStyle={activeLink} css={css`display: none`} to='/login/' onClick={logout}> Logout</NavLink>
                <NavLink activeStyle={activeLink} css={css`margin-right: 0px;`} to='/login/'>Login</NavLink>
              </div>
              <div css={css`
                height: 5px;
                width: 100%;
                background-color: black;
                border-radius: 5px;
                margin-top: 5px;
                `}></div>
            </div>
            )
      }
    </header>
  )
}

// Header.propTypes = {
  // siteTitle: PropTypes.string,
// }
//
// Header.defaultProps = {
  // siteTitle: ``,
// }

export default Header;
