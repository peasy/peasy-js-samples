import constants from '../constants';
import ordersDotCom from '../businessLogic';
import ActionsBase from './ActionsBase';

class InventoryItemActions extends ActionsBase {

  service() {
    return ordersDotCom.services.inventoryItemService;
  }

	getByIdAction(data) {
		return { type: constants.actions.GET_INVENTORY_ITEM_SUCCESS, inventoryItem: data };
	}

	getAllAction(data) {
		return { type: constants.actions.LOAD_INVENTORY_ITEMS_SUCCESS, inventoryItems: data };
	}

	updateAction(data) {
		return { type: constants.actions.UPDATE_INVENTORY_ITEM_SUCCESS, inventoryItem: data };
	}

	destroyAction(id) {
		return { type: constants.actions.DESTROY_INVENTORY_ITEM_SUCCESS, id: id };
	}

  destroy(id) {
    var self = this;
    return function(dispatch, getState) {
      return dispatch(self.destroyAction(id));
    }
  }
}

export default InventoryItemActions;