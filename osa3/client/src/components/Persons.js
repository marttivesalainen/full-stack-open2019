import React from 'react';

const Persons = ({ persons, search, handleRemove }) => {
  return (
    <ul>
      {persons
        .filter(
          person =>
            search.length === 0 ||
            person.name.toLowerCase().match(search.toLowerCase())
        )
        .map(person => (
          <li key={person.name}>
            {person.name} {person.number}
            <button key={person.name} onClick={() => handleRemove(person)}>
              Poista
            </button>
          </li>
        ))}
    </ul>
  );
};

export default Persons;
