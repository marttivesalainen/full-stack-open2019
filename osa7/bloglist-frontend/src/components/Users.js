import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import User from './User';
import UserList from './UserList';

import { initializeUsers } from '../reducers/usersReducer';

const Users = props => {
  useEffect(() => {
    props.initializeUsers();
  }, []);

  if (props.users.length === 0) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <h1>Users</h1>
      <Router>
        <Route
          exact
          path={`${props.match.path}`}
          render={() => <UserList users={props.users} />}
        />
        <Route exact path={`${props.match.path}/:id`} component={User} />
      </Router>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.users,
    user: state.user,
    blogs: state.blogs,
    notification: state.notification
  };
};

export default connect(
  mapStateToProps,
  { initializeUsers }
)(Users);
