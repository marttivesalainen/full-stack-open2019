export const createNotification = message => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message
    });

    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 2000);
  };
};

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message;
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

export default reducer;
