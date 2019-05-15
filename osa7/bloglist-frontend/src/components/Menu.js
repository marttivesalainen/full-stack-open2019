import React from 'react';
import { Link } from 'react-router-dom';

const Menu = props => {
  return (
    <div>
      <Link to="/">Blogit</Link>
      <Link to="/users">Käyttäjät</Link>
      {props.children}
    </div>
  );
};

export default Menu;
