import React from 'react';
import { useField } from '../hooks';

const LoginForm = ({ handleLogin }) => {
  const username = useField('text');
  const password = useField('password');

  const handleSubmit = event => {
    event.preventDefault();
    handleLogin(username.field.value, password.field.value);
    username.reset();
    password.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        Käyttäjätunnus
        <input {...username.field} />
      </div>
      <div>
        Salasana
        <input {...password.field} />
      </div>
      <div>
        <button type="submit">Kirjaudu</button>
      </div>
    </form>
  );
};

export default LoginForm;
