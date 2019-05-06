import React from 'react';

const Weather = ({ weather }) => {
  return (
    <div>
      <h3>Weather in {weather.location.name}</h3>
      <p>
        <strong>Temperature</strong> {weather.current.temp_c} °C
      </p>
      <img alt={weather.name} src={weather.current.condition.icon} />
      <p>
        Wind{' '}
        {Math.floor((100 * (weather.current.wind_kph * 1000)) / 3600) / 100} m/s{' '}
        {weather.current.wind_dir}
      </p>
    </div>
  );
};

export default Weather;
