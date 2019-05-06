import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = props => {
  const handleFilter = event => {
    props.setFilter(event.target.value);
  };

  return (
    <div>
      Filter
      <form>
        <input onChange={handleFilter} type="text" name="filter" />
      </form>
    </div>
  );
};

export default connect(
  null,
  { setFilter }
)(Filter);
