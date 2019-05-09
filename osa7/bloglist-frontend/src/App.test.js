import React from 'react';
import { render, waitForElement } from 'react-testing-library';
jest.mock('./services/blogs');
import App from './App';

describe('<App />', () => {
  let component;

  afterEach(() => {
    component = null;
  });

  it('renders login form when not logged in', async () => {
    component = render(<App />);
    await waitForElement(() => component.getByText('Kirjaudu'));

    expect(component.getAllByText('Kirjaudu').length).toBe(1);

    expect(component.container.querySelectorAll('.blog').length).toBe(0);
  });

  it('renders one blog when logged in', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    };

    localStorage.setItem('loggedInUser', JSON.stringify(user));

    component = render(<App />);

    await waitForElement(() => component.container.querySelectorAll('.blog'));

    expect(component.container.querySelectorAll('.blog').length).toBe(1);
  });
});
