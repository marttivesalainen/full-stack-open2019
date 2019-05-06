import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Country from './components/Country';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data));
  }, []);

  const handleSearch = event => {
    setSearch(event.target.value);
  };

  const results = countries.filter(country =>
    country.name.toLowerCase().match(new RegExp(search.toLowerCase(), 'g'))
  );

  return (
    <div>
      <p>Find countries</p>
      <input value={search} onChange={handleSearch} />
      {results.length > 10 && <p>Too many matches, specify another filter</p>}
      {results.length <= 10 && results.length > 1 && (
        <ul>
          {results.map(country => (
            <li key={country.name}>
              {country.name}
              <button
                key={`button${country.name}`}
                onClick={() => setSearch(country.name)}
              >
                Show
              </button>
            </li>
          ))}
        </ul>
      )}
      {results.length === 1 &&
        results.map(country => (
          <Country key={country.name} country={country} />
        ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
