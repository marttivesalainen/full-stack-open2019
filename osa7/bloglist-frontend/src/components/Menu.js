import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from './common/elements/Button';

const Nav = styled.div`
  width: 80vw;
  margin-bottom: 2em;
`;

const Profile = styled.div`
  float: right;
  font-family: 'Poppins';
`;

const ButtonLink = styled(Link)`
  font-family: 'Poppins';
  margin: 1em 1em;
  text-decoration: none;

  a,
  :hover,
  :visited {
    color: #000;
  }
`;

const Menu = props => {
  return (
    <Nav>
      <ButtonLink to="/">Blogit</ButtonLink>
      <ButtonLink to="/users">Käyttäjät</ButtonLink>

      <Profile>
        <i>{props.user} kirjautunut sisään </i>
        <Button onClick={props.handleLogout}>Kirjaudu ulos</Button>
      </Profile>
    </Nav>
  );
};

export default Menu;
