import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Weather from './Weather';

const secret = require('../secret.json');

const Country = ({ country }) => {
  const [weather, setWeather] = useState('');

  useEffect(() => {
    axios
      .get(
        `https://api.apixu.com/v1/current.json?key=${secret.API_KEY}&q=
    ${country.capital}`
      )
      .then(response => setWeather(response.data));
  }, []);

  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => {
          return <li key={language.name}>{language.name}</li>;
        })}
      </ul>
      <img alt={country.flag} width="150" src={country.flag} />
      {weather ? <Weather weather={weather} /> : <p>loading weather...</p>}
    </div>
  );
};

export default Country;
