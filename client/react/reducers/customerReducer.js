export default function customerReducer(state = [], action) {
  switch (action.type) {
    case 'CREATE_CUSTOMER':
      return [...state, Object.assign({}, action.customer)];
    default:
      return state;
  }
};