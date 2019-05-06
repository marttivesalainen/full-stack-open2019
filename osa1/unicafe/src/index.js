import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = props => {
  return <button onClick={props.handleClick}>{props.children}</button>;
};

const Statistics = props => {
  const { good, neutral, bad } = props;

  const count = good + neutral + bad;
  const value = good * 1 + bad * -1;
  const mean = value / count;
  const positivePercent = (good / count) * 100;

  if (count === 0) {
    return <p>Ei yhtään palautetta annettu</p>;
  }

  return (
    <table>
      <tbody>
        <Statistic text="hyvä" value={good} />
        <Statistic text="neutraali" value={neutral} />
        <Statistic text="huono" value={bad} />
        <tr>
          <td>yhteensä</td>
          <td>{count}</td>
        </tr>
        <tr>
          <td>keskiarvo</td>
          <td>{mean || 0}</td>
        </tr>
        <tr>
          <td>positiivisia</td>
          <td>{positivePercent || '-'} %</td>
        </tr>
      </tbody>
    </table>
  );
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text} </td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleIncrement = (value, handler) => {
    handler(value + 1);
  };

  return (
    <div>
      <h1>anna palautetta</h1>
      <Button handleClick={() => handleIncrement(good, setGood)}>Hyvä</Button>
      <Button handleClick={() => handleIncrement(neutral, setNeutral)}>
        Neutraali
      </Button>
      <Button handleClick={() => handleIncrement(bad, setBad)}>Huono</Button>
      <h1>statistiikka</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
