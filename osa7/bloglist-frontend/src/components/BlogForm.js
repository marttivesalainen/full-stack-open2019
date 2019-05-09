import React from 'react';
import { useField } from '../hooks';
import PropTypes from 'prop-types';

const BlogForm = ({ handleNewBlog }) => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const handleSubmit = async event => {
    event.preventDefault();
    const newBlog = {
      title: title.field.value,
      author: author.field.value,
      url: url.field.value
    };
    const status = await handleNewBlog(newBlog);
    if (status === true) {
      title.reset();
      author.reset();
      url.reset();
    }
  };

  return (
    <form>
      <div>
        Title&nbsp;
        <input {...title.field} />
      </div>
      <div>
        Author&nbsp;
        <input {...author.field} />
      </div>
      <div>
        Url&nbsp;
        <input {...url.field} />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          Lisää
        </button>
      </div>
    </form>
  );
};

BlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired
};

export default BlogForm;
