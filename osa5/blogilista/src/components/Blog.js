import React, { useState } from 'react';
const Blog = ({ blog, handleLike, handleDelete, owner }) => {
  const [visible, setVisible] = useState(false);

  const container = { border: 'solid 1px #000', margin: '2px' };
  const details = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLikeClick = async event => {
    event.preventDefault();
    await handleLike(blog);
  };

  const handleDeleteClick = async event => {
    event.preventDefault();
    if (
      window.confirm(`Oletko varma, että haluat poistaa blogin ${blog.title}`)
    )
      handleDelete(blog.id);
  };

  return (
    <div className="blog" style={container}>
      <p className="toggle" onClick={toggleVisibility}>
        {blog.title} {blog.author}
      </p>
      <div className="details" style={details}>
        <a href={blog.url}>{blog.url}</a>
        <p>
          {blog.likes} tykkäystä{' '}
          <button onClick={handleLikeClick}>Tykkää</button>
        </p>
        <p>Lisännyt {blog.user.name}</p>
        {owner && <button onClick={handleDeleteClick}>Poista</button>}
      </div>
    </div>
  );
};

export default Blog;
