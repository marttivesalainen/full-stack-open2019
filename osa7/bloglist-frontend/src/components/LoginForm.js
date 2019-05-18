import React from 'react';
import styled from 'styled-components';

import FontAwesome from 'react-fontawesome';
import { useField } from '../hooks';

const Wrapper = styled.div`
  display: block;
  position: relative;
  background: #ffffff;
  padding: 1em 3em 5em 3em;

  border-radius: 3px;
  h1,
  p {
    font-family: 'Poppins', sans-serif;
    text-align: center;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 1em;
`;

const Input = styled.input`
  font-family: 'Raleway', sans-serif;
  font-weight: 600 !important;
  font-size: 1em;
  letter-spacing: 0;
  height: 2.5em;
  color: #686868;
  background: #cae6d1;
  border-radius: 3px;
  border: none;
  padding-left: 3em;
  width: calc(100% - 3em);
`;

const Symbol = styled.span`
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  bottom: 0;
  height: 100%;
  padding-left: 1em;
`;

const Button = styled.button`
  border-radius: 3px;
  background: #cae6d1;
  height: 3em;
  border: none;
  margin-bottom: 2em;
  width: 100%;
`;

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
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <h1>Hello!</h1>
        <p>Lorem ipsum lipsum</p>

        <InputWrapper>
          <Input
            id="username"
            placeholder="Käyttäjätunnus"
            {...username.field}
          />
          <Symbol>
            <FontAwesome name="signature" />
          </Symbol>
        </InputWrapper>

        <InputWrapper>
          <Input id="password" placeholder="Salasana" {...password.field} />
          <Symbol>
            <FontAwesome name="key" />
          </Symbol>
        </InputWrapper>
        <div>
          <Button type="submit">Kirjaudu</Button>
        </div>

        <p>Kirjautumalla sisään hyväksyt kaikenlaista</p>
      </form>
    </Wrapper>
  );
};

export default LoginForm;
