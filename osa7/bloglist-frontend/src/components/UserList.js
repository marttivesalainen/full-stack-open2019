import React from 'react';
import { Link } from 'react-router-dom';

const UserList = props => {
  return (
    <table>
      <thead>
        <tr>
          <th />
          <th>Blogeja</th>
        </tr>
      </thead>
      <tbody>
        {props.users
          .sort((a, b) => b.blogs.length - a.blogs.length)
          .map(user => {
            return (
              <tr key={user.id}>
                <td>
                  <Link key={user.id} to={`/users/${user.id}`}>
                    {user.name}
                  </Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default UserList;
