import constants from '../constants';
import ordersDotCom from '../../businessLogic';
import ActionsBase from './ActionsBase';

class OrderItemActions extends ActionsBase {

  service() {
    return ordersDotCom.services.orderItemService;
  }

  getAllAction(data) { 
    return { type: constants.actions.LOAD_ORDER_ITEMS_SUCCESS, orderItems: data };
  }

  insertAction(data) { 
    return { type: constants.actions.INSERT_ORDER_ITEM_SUCCESS, orderItem: data };
  }

  updateAction(data) { 
    return { type: constants.actions.UPDATE_ORDER_ITEM_SUCCESS, orderItem: data };
  }

  destroyAction(id) { 
    return { type: constants.actions.DESTROY_ORDER_ITEM_SUCCESS, id: id };
  }
}

export default OrderItemActions;