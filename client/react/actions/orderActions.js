import constants from '../constants';
import ordersDotCom from '../../businessLogic';
import ActionsBase from './ActionsBase';

class OrderActions extends ActionsBase {

  service() {
    return ordersDotCom.services.orderService;
  }

  getAllAction(data) { 
    return { type: constants.actions.LOAD_ORDERS_SUCCESS, orders: data };
  }

  insertAction(data) { 
    return { type: constants.actions.INSERT_ORDER_SUCCESS, order: data };
  }

  updateAction(data) { 
    return { type: constants.actions.UPDATE_ORDER_SUCCESS, order: data };
  }

  destroyAction(id) { 
    return { type: constants.actions.DESTROY_ORDER_SUCCESS, id: id };
  }
}

export default OrderActions;