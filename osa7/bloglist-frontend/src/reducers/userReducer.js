import loginService from '../services/login';
import blogService from '../services/blogs';
import { createNotification } from './notificationReducer';

export const initializeUser = () => {
  return dispatch => {
    const user = window.localStorage.getItem('loggedInUser');

    if (user) {
      dispatch({
        type: 'SET_USER',
        user
      });
    }
  };
};

export const setUser = (username, password) => {
  return dispatch => {
    loginService
      .login({
        username,
        password
      })
      .then(user => {
        window.localStorage.setItem('loggedInUser', JSON.stringify(user));
        blogService.setToken(user.token);

        dispatch({
          type: 'SET_USER',
          user
        });
      })
      .catch(error => {
        dispatch(
          createNotification('käyttäjätunnus tai salasana virheellinen')
        );
      });
  };
};

export const removeUser = () => {
  window.localStorage.removeItem('loggedInUser');
  return { type: 'SET_USER', user: null };
};

const reducer = (
  state = JSON.parse(window.localStorage.getItem('loggedInUser')),
  action
) => {
  switch (action.type) {
    case 'SET_USER':
      return action.user ? action.user : null;
    default:
      return state;
  }
};

export default reducer;
