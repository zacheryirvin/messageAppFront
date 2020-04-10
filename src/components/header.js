import { Link } from "gatsby";
import styled from '@emotion/styled';
import {css, jsx} from '@emotion/core';
import PropTypes from "prop-types";
import React, {useState} from "react";

const NavLink = styled(Link)`
  margin-right: 5px;
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
            <div css={css`display: flex`}>
              <div css={css`
                display: flex;
                justify-content: flex-start;
                width: 49%;
              `}>
                <NavLink to='/userList' state={{user: props.user}}>Users</NavLink>
              </div>
              <div css={css`
                display: flex;
                justify-content: flex-end;
                width: 49%;
              `}>
                <NavLink to='/' state={{user: props.user}}>Home</NavLink>
                <NavLink to='/login/' onClick={logout}> Logout</NavLink>
                <NavLink css={css`display: none`} to='/login/'>Login</NavLink>
              </div>
            </div>
            ) 
          : (
            <div css={css`display: flex`}>
              <div css={css`
                display: flex;
                justify-content: flex-start;
                width: 49%;
              `}>
                <NavLink to='/userList' state={{user: props.user}}>Users</NavLink>
              </div>
              <div css={css`
                display: flex;
                justify-content: flex-end;
                width: 49%;
              `}>
                <NavLink to='/' state={{user: props.user}}>Home</NavLink>
                <NavLink css={css`display: none`} to='/login/' onClick={logout}> Logout</NavLink>
                <NavLink to='/login/'>Login</NavLink>
              </div>
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
