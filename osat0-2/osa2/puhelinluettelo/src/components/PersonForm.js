import React from 'react';

const PersonForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="name">Nimi:</label>
        <input id="name" value={props.name} onChange={props.handleNameChange} />
      </div>
      <div>
        <label htmlFor="phone">Numero: </label>
        <input
          id="phone"
          value={props.number}
          onChange={props.handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  );
};

export default PersonForm;
