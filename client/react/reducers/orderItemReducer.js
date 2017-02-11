import constants from '../constants';

export default function orderItemReducer(state = [], action) {
  switch (action.type) {
    case constants.actions.INSERT_ORDER_ITEM_SUCCESS:
      return [...state, Object.assign({}, action.orderItem)];
    case constants.actions.UPDATE_ORDER_ITEM_SUCCESS:
      return [...state.filter(orderItem => orderItem.id !== action.orderItem.id), 
        Object.assign({}, action.orderItem)
      ];
    case constants.actions.SUBMIT_ORDER_ITEM_SUCCESS:
      return [...state.filter(orderItem => orderItem.id !== action.orderItem.id), 
        Object.assign({}, action.orderItem)
      ];
    case constants.actions.SHIP_ORDER_ITEM_SUCCESS:
      return [...state.filter(orderItem => orderItem.id !== action.orderItem.id), 
        Object.assign({}, action.orderItem)
      ];
    case constants.actions.DESTROY_ORDER_ITEM_SUCCESS:
      return [...state.filter(orderItem => orderItem.id !== action.id)];
    case constants.actions.LOAD_ORDER_ITEMS_SUCCESS:
      return action.orderItems;
    default:
      return state;
  }
};