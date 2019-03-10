import constants from '../constants';
import ordersDotCom from '../businessLogic';
import ActionsBase from './ActionsBase';
import OrderItemActions from './orderItemActions';

let orderItemActions = new OrderItemActions();

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

  submitOrder(id) {
    var self = this;
    return function(dispatch, getState) {
      var orderItems = getState().orderItems;
      var submittableItems = orderItems.filter(i => {
        return i.orderId === id && i.status === "PENDING"
      })
      var foo = submittableItems.map(i => {
        return dispatch(orderItemActions.submitOrderItem(i.id));
      });
      return Promise.all(foo);
    }
  }
}

export default OrderActions;