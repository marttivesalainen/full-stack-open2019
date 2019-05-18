import React from 'react';
import { useField } from '../hooks';
import PropTypes from 'prop-types';

import Button from './common/elements/Button';

const CommentForm = ({ handleNewComment }) => {
  const comment = useField('text');

  const handleSubmit = async event => {
    event.preventDefault();
    const newComment = {
      comment: comment.field.value
    };

    handleNewComment(newComment);
    comment.reset();
  };

  return (
    <form>
      <div>
        comment&nbsp;
        <input id="comment" {...comment.field} />
      </div>

      <div>
        <Button type="submit" onClick={handleSubmit} data-cy="addComment">
          Lisää
        </Button>
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  handleNewComment: PropTypes.func.isRequired
};

export default CommentForm;
