import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, fireEvent } from 'react-testing-library';
import SimpleBlog from './SimpleBlog';

afterEach(cleanup);

test('method is called 2 times when clicked twice', () => {
  const blog = {
    author: 'Matti Meikäläinen',
    title: 'Otsikko',
    likes: 10
  };

  const mockHandler = jest.fn();

  const component = render(<SimpleBlog blog={blog} onClick={mockHandler} />);

  const button = component.getByText('like');
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(2);
});
