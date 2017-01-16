export default function courseReducer(state = [], action) {
  switch (action.type) {
    case 'CREATE_CUSTOMER':
        return [...state, Object.assign({}, action.customer)];
      break;
  
    default:
      return state;
  }
};