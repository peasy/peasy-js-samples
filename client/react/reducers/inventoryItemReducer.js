import constants from '../constants';

export default function inventoryItemReducer(state = [], action) {
  switch (action.type) {
    case constants.actions.GET_INVENTORY_ITEM_SUCCESS:
      return [...state.filter(inventoryItem => inventoryItem.id !== action.inventoryItem.id), 
        Object.assign({}, action.inventoryItem)
      ];
    case constants.actions.INSERT_INVENTORY_ITEM_SUCCESS:
      return [...state, Object.assign({}, action.inventoryItem)];
    case constants.actions.UPDATE_INVENTORY_ITEM_SUCCESS:
      return [...state.filter(inventoryItem => inventoryItem.id !== action.inventoryItem.id), 
        Object.assign({}, action.inventoryItem)
      ];
    case constants.actions.DESTROY_INVENTORY_ITEM_SUCCESS:
      return [...state.filter(inventoryItem => inventoryItem.id !== action.id)];
    case constants.actions.LOAD_INVENTORY_ITEMS_SUCCESS:
      return action.inventoryItems;
    default:
      return state;
  }
};