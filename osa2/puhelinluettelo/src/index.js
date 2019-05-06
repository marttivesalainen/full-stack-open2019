import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

import personService from './services/personService';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '1234' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
      .catch(err => alert('error error'));
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    const existingPerson = persons.find(
      person => person.name === newPerson.name
    );

    if (existingPerson && window.confirm(`Päivitetäänkö ${newPerson.name}?`)) {
      personService
        .update(existingPerson.id, newPerson)
        .then(updatedPerson =>
          setPersons(
            persons.map(person =>
              person.id !== existingPerson.id ? person : updatedPerson
            )
          )
        );
    } else {
      personService.create(newPerson).then(newPerson => {
        setPersons(persons.concat(newPerson));

        setNotification({
          type: 'success',
          message: `Henkilö ${newPerson.name} lisätty`
        });

        setTimeout(() => setNotification(''), 1000);
      });
    }

    setNewName('');
    setNewNumber('');
  };

  const handleRemove = personToRemove => {
    if (window.confirm(`Poistetaanko ${personToRemove.name}`)) {
      personService
        .remove(personToRemove.id)
        .then(() => {
          setPersons(
            persons
              .filter(person => person.id !== personToRemove.id)
              .map(person => person)
          );
        })
        .catch(() => {
          setNotification({
            type: 'error',
            message: `Henkilö ${personToRemove.name} oli jo poistettu`
          });

          setTimeout(() => setNotification(''), 1000);
        });
    }
  };

  const handleFormChange = (event, setter) => {
    setter(event.target.value);
  };

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      {notification && <Notification notification={notification} />}
      <Filter
        value={search}
        handleChange={event => handleFormChange(event, setSearch)}
      />
      <h3>Lisää uusi</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        handleSubmit={handleSubmit}
        handleNameChange={event => handleFormChange(event, setNewName)}
        handleNumberChange={event => handleFormChange(event, setNewNumber)}
      />
      <h3>Numerot</h3>
      <Persons search={search} persons={persons} handleRemove={handleRemove} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
