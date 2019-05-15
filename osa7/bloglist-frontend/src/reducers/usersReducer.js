import userService from '../services/users';

export const initializeUsers = () => {
  return dispatch => {
    userService.getAll().then(users => {
      dispatch({
        type: 'INIT_USERS',
        users
      });
    });
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.users;
    default:
      return state;
  }
};

export default reducer;
