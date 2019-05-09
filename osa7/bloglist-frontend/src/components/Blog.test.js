import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, fireEvent } from 'react-testing-library';
import Blog from './Blog';

afterEach(cleanup);

describe('<Blog />', () => {
  it('hides details by default and shows when clicked', () => {
    const blog = {
      author: 'Matti Meikäläinen',
      title: 'Otsikko',
      likes: 10,
      user: {
        name: 'Essi Esimerkki'
      }
    };

    const component = render(<Blog blog={blog} />);

    const details = component.container.querySelector('.details');
    expect(details).toHaveStyle('display: none');

    const title = component.getByText(`${blog.title} ${blog.author}`);
    fireEvent.click(title);
    expect(details).not.toHaveStyle('display: none');
  });
});
