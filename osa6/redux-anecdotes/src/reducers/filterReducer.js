export const setFilter = value => {
  return {
    type: 'FILTER',
    value
  };
};

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return { value: action.value.toLowerCase() };
    default:
      return state;
  }
};

export default reducer;
