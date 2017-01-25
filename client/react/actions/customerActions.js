import constants from '../constants';
import ordersDotCom from '../../businessLogic';

function loadCustomersSuccess(customers) {
  return { type: constants.actions.LOAD_CUSTOMERS_SUCCESS, customers: customers };
}

function insertCustomerSuccess(customer) {
  return { type: constants.actions.INSERT_CUSTOMER_SUCCESS, customer: customer };
}

function updateCustomerSuccess(customer) {
  return { type: constants.actions.UPDATE_CUSTOMER_SUCCESS, customer: customer };
}

export function loadCustomers() {
  return function(dispatch, getState) {
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

export function saveCustomer(customer) {
  return function(dispatch, getState) {
    var proxy = new ordersDotCom.dataProxies.CustomerDataProxy();
    var service = new ordersDotCom.services.CustomerService(proxy);
    var { command, actionFunc } = getFunctionsFor(customer);

    command.execute((err, result) => {
      if (!err) {
        return dispatch(actionFunc(result.value));
      }
      return dispatch(saveCustomerFailure(err));
    });

    function getFunctionsFor(customer) {
      if (customer.id) {
        return {
          command: service.updateCommand(customer),
          actionFunc: updateCustomerSuccess
        };
      }
      return {
        command: service.insertCommand(customer),
        actionFunc: insertCustomerSuccess
      };
    }
  }
};