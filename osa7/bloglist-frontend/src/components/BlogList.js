import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import BlogForm from './BlogForm';
import Togglable from './Togglable';

import { createBlog, likeBlog, removeBlog } from '../reducers/blogReducer';
import { createNotification } from '../reducers/notificationReducer';

const BlogList = props => {
  const blogFormRef = React.createRef();

  const handleNewBlog = async blog => {
    blogFormRef.current.toggleVisibility();
    props.createBlog(blog);
  };

  return (
    <div>
      <Togglable buttonLabel="Create blog" ref={blogFormRef}>
        <h2>Create Blog</h2>
        <BlogForm handleNewBlog={handleNewBlog} />
      </Togglable>
      {props.blogs
        .sort((a, b) => {
          return b.likes - a.likes;
        })
        .map(blog => {
          return (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          );
        })}
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
    createBlog,
    likeBlog,
    removeBlog,
    createNotification
  }
)(BlogList);
