import constants from '../constants';
import ordersDotCom from '../businessLogic';
import ActionsBase from './ActionsBase';

class CustomerActions extends ActionsBase {

  service() {
    return ordersDotCom.services.customerService;
  }

	getAllAction(data) {
    return { type: constants.actions.LOAD_CUSTOMERS_SUCCESS, customers: data };
  }

  insertAction(data) {
    return { type: constants.actions.INSERT_CUSTOMER_SUCCESS, customer: data };
  }

  updateAction(data) {
    return { type: constants.actions.UPDATE_CUSTOMER_SUCCESS, customer: data };
  }

  destroyAction(id) {
    return { type: constants.actions.DESTROY_CUSTOMER_SUCCESS, id: id };
  }
}

export default CustomerActions;