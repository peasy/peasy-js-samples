import constants from '../constants';

export default function customerReducer(state = [], action) {
  switch (action.type) {
    case constants.actions.INSERT_CUSTOMER_SUCCESS:
      return [...state, Object.assign({}, action.customer)];
    case constants.actions.UPDATE_CUSTOMER_SUCCESS:
      return [...state.filter(customer => customer.id !== action.customer.id), 
        Object.assign({}, action.customer)
      ];
    case constants.actions.LOAD_CUSTOMERS_SUCCESS:
      return action.customers;
    default:
      return state;
  }
};