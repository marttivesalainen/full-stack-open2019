import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import { initializeAnecdotes } from './reducers/anecdoteReducer';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = props => {
  useEffect(() => {
    props.initializeAnecdotes();
  }, []);

  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default connect(
  null,
  { initializeAnecdotes }
)(App);
