import { Link } from "gatsby";
import styled from '@emotion/styled';
import {css, jsx} from '@emotion/core';
import PropTypes from "prop-types";
import React from "react";

const NavLink = styled(Link)`
  margin-right: 5px;
`

const logout = async () => {
  const url = `http://localhost:4000/users/logout`
  const res = await fetch(url, {
    method: 'GET',
  })
  const response = await res.json()
  return response;
}

const Header = (props) => {
  console.log(props)
  return (
    <header>
      <div css={css`
        display: flex;
        justify-content: right;
      `}>
        <NavLink to='/'>Home</NavLink>
        {props.user != undefined
            ? <NavLink to='/login' onClick={logout}>Logout</NavLink>
            : <NavLink to='/login/'>Login</NavLink>
        }
      </div>
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
