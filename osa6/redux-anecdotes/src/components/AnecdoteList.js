import React from 'react';
import { connect } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = props => {
  const vote = id => {
    props.voteAnecdote(id);
    props.setNotification(`voted ${id}`, 2);
  };

  return (
    <div>
      <h2>Anecdotes</h2>

      {props.visibleAnecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes.filter(anecdote => {
    return filter.value
      ? anecdote.content.toLowerCase().includes(filter.value)
      : true;
  });
};

const mapStateToProps = state => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  };
};

export default connect(
  mapStateToProps,
  { setNotification, voteAnecdote }
)(AnecdoteList);
