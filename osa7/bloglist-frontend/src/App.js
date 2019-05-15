import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Menu from './components/Menu';
import Blog from './components/Blog';
import Users from './components/Users';
import BlogList from './components/BlogList';

import blogService from './services/blogs';
import { initializeBlogs } from './reducers/blogReducer';
import LoginForm from './components/LoginForm';

import { setUser, removeUser } from './reducers/userReducer';

const App = props => {
  useEffect(() => {
    props.initializeBlogs();

    if (props.user) {
      blogService.setToken(props.user.token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    props.setUser(username, password);
  };

  const handleLogout = event => {
    event.preventDefault();
    props.removeUser();
  };

  return (
    <div>
      <h1>Blogs</h1>

      <div>{props.notification}</div>

      {!props.user ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <>
          <Router>
            <Menu>
              {props.user.name} kirjautunut sisään{' '}
              <button onClick={handleLogout}>Kirjaudu ulos</button>
            </Menu>

            <Route exact path="/" component={BlogList} />
            <Route path="/users" component={Users} />
            <Route exact path="/blogs/:id" component={Blog} />
          </Router>
        </>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    blogs: state.blogs,
    notification: state.notification
  };
};

export default connect(
  mapStateToProps,
  {
    setUser,
    removeUser,
    initializeBlogs
  }
)(App);
