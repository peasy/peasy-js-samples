import constants from '../constants';

export default function orderReducer(state = [], action) {
  switch (action.type) {
    case constants.actions.INSERT_ORDER_SUCCESS:
      return [...state, Object.assign({}, action.order)];
    case constants.actions.UPDATE_ORDER_SUCCESS:
      return [...state.filter(order => order.id !== action.order.id), 
        Object.assign({}, action.order)
      ];
    case constants.actions.DESTROY_ORDER_SUCCESS:
      return [...state.filter(order => order.id !== action.id)];
    case constants.actions.LOAD_ORDERS_SUCCESS:
      return action.orders;
    default:
      return state;
  }
};