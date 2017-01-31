import constants from '../constants';

export default function categoryReducer(state = [], action) {
  switch (action.type) {
    case constants.actions.INSERT_CATEGORY_SUCCESS:
      return [...state, Object.assign({}, action.category)];
    case constants.actions.UPDATE_CATEGORY_SUCCESS:
      return [...state.filter(category => category.id !== action.category.id), 
        Object.assign({}, action.category)
      ];
    case constants.actions.DESTROY_CATEGORY_SUCCESS:
      return [...state.filter(category => category.id !== action.id)];
    case constants.actions.LOAD_CATEGORIES_SUCCESS:
      return action.categories;
    default:
      return state;
  }
};