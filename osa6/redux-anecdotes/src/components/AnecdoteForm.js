import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = props => {
  const newAnecdote = async event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    props.createAnecdote(content);
    event.target.anecdote.value = '';
    props.setNotification(`created ${content}`, 2);
  };
  return (
    <div>
      <h2>Create new anecdote</h2>

      <form onSubmit={newAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes
  };
};

export default connect(
  mapStateToProps,
  { createAnecdote, setNotification }
)(AnecdoteForm);
