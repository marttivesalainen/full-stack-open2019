import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';

import Menu from './components/Menu';
import Blog from './components/Blog';
import Users from './components/Users';
import BlogList from './components/BlogList';

import blogService from './services/blogs';
import { initializeBlogs } from './reducers/blogReducer';
import LoginForm from './components/LoginForm';

import { setUser, removeUser } from './reducers/userReducer';

const Wrapper = styled.div`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  flex: 100%;

  border-radius: 3px;

  h1,
  h2,
  h3,
  h4 p {
    font-family: 'Poppins', sans-serif;
    text-align: center;
  }
`;

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
      <div>{props.notification}</div>

      {!props.user ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <>
          <Router>
            <Wrapper>
              <Menu user={props.user.name} handleLogout={handleLogout} />

              <Route exact path="/" component={BlogList} />
              <Route path="/users" component={Users} />
              <Route exact path="/blogs/:id" component={Blog} />
            </Wrapper>
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
