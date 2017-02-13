import constants from '../constants';
import ordersDotCom from '../../businessLogic';
import ActionsBase from './ActionsBase';
import CommandInvoker from '../commandInvoker';

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

  destroyByOrderAction(items) {
    return { type: constants.actions.DESTROY_BY_ORDER_SUCCESS, orderItems: items };
  }

  submitAction(data) {
    return { type: constants.actions.SUBMIT_ORDER_ITEM_SUCCESS, orderItem: data };
  }

  shipAction(data) {
    return { type: constants.actions.SHIP_ORDER_ITEM_SUCCESS, orderItem: data };
  }

  destroyByOrder(orderId) {
    var self = this;
    return function(dispatch, getState) {
      var orderItems = getState().orderItems.filter(i => i.orderId === orderId);
      return dispatch(self.destroyByOrderAction(orderItems));
    }
  }

  submitOrderItem(id) {
    var self = this;
    return function(dispatch, getState) {
      var command = self.service().submitCommand(id);
      return new CommandInvoker(dispatch).invoke(command, self.submitAction);
    }
  }

  shipOrderItem(id) {
    var self = this;
    return function(dispatch, getState) {
      var command = self.service().shipCommand(id);
      return new CommandInvoker(dispatch).invoke(command, self.shipAction);
    }
  }
}

export default OrderItemActions;