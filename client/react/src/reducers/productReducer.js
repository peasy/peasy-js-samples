import constants from '../constants';

export default function productReducer(state = [], action) {
  switch (action.type) {
    case constants.actions.INSERT_PRODUCT_SUCCESS:
      return [...state, Object.assign({}, action.product)];
    case constants.actions.UPDATE_PRODUCT_SUCCESS:
      return [...state.filter(product => product.id !== action.product.id), 
        Object.assign({}, action.product)
      ];
    case constants.actions.DESTROY_PRODUCT_SUCCESS:
      return [...state.filter(product => product.id !== action.id)];
    case constants.actions.LOAD_PRODUCTS_SUCCESS:
      return action.products;
    default:
      return state;
  }
};