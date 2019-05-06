import React from 'react';

const Filter = props => {
  return (
    <>
      <label htmlFor="search">rajaa näytettäviä </label>
      <input id="search" value={props.search} onChange={props.handleChange} />
    </>
  );
};

export default Filter;
