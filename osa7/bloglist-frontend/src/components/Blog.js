import React from 'react';
import { connect } from 'react-redux';
import { createComment, likeBlog, removeBlog } from '../reducers/blogReducer';

import CommentForm from './CommentForm';
import Button from './common/elements/Button';

const Blog = props => {
  if (props.blogs.length === 0 || !props.user) {
    return <p>Loading</p>;
  }

  const blog = props.blogs.find(blog => blog.id === props.match.params.id);

  const owner = blog.user.username === props.user.username;

  const handleLikeClick = async event => {
    event.preventDefault();
    props.likeBlog(blog);
  };

  const handleDeleteClick = event => {
    event.preventDefault();
    if (
      window.confirm(`Oletko varma, että haluat poistaa blogin ${blog.title}`)
    )
      props.removeBlog(blog.id);
    props.history.push('/');
  };

  const handleNewComment = comment => {
    props.createComment(blog.id, comment);
  };

  return (
    <div className="blog">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <p>
          {blog.likes} tykkäystä{' '}
          <Button onClick={handleLikeClick}>Tykkää</Button>
        </p>
        <p>Lisännyt {blog.user.name}</p>

        {owner && <Button onClick={handleDeleteClick}>Poista</Button>}

        <h3>Kommentit</h3>

        <CommentForm handleNewComment={handleNewComment} />

        {blog.comments.map(comment => {
          return <li key={`${comment}${Math.random() * 100}`}>{comment}</li>;
        })}
      </div>
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
  { createComment, likeBlog, removeBlog }
)(Blog);
