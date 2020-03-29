import { Link } from "gatsby";
import styled from '@emotion/styled';
import {css, jsx} from '@emotion/core';
import PropTypes from "prop-types";
import React from "react";

const NavLink = styled(Link)`
  margin-right: 5px;
`

const Header = ({ siteTitle }) => {
  return (
    <header>
      <div css={css`
        display: flex;
        justify-content: right;
      `}>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/login/'>Login</NavLink>
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
