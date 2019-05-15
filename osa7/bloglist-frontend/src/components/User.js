import React from 'react';
import { connect } from 'react-redux';

const User = props => {
  const user = props.users.find(user => user.id === props.match.params.id);

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Blogit</h2>
      {user.blogs.map(blog => {
        return <li key={blog.id}>{blog.title}</li>;
      })}
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

export default connect(mapStateToProps)(User);
