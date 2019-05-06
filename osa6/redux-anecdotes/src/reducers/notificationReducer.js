const initialState = {};

export const createMessage = message => {
  return { type: 'NEW_MESSAGE', message };
};

export const clearMessage = () => {
  return { type: 'CLEAR_MESSAGES' };
};

export const setNotification = (message, delay) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_MESSAGE',
      message: message
    });
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_MESSAGES'
      });
    }, delay * 1000);
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_MESSAGE':
      return { message: action.message };
    case 'CLEAR_MESSAGES':
      return {};
    default:
      return state;
  }
};

export default reducer;
