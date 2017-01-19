import constants from '../constants';
import ordersDotCom from '../../businessLogic';

function loadCustomersSuccess(customers) {
  return { type: constants.actions.LOAD_CUSTOMERS_SUCCESS, customers: customers }
};

export function loadCustomers() {
  return function(dispatch) {
    var proxy = new ordersDotCom.dataProxies.CustomerDataProxy();
    var service = new ordersDotCom.services.CustomerService(proxy);
    var command = service.getAllCommand();
    command.execute((err, result) => {
      if (!err) {
        return dispatch(loadCustomersSuccess(result.value));
      }
      return dispatch(loadCustomersFailure(err));
    });
  }
};