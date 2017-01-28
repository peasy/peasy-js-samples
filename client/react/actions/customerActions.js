import constants from '../constants';
import ordersDotCom from '../../businessLogic';
import CommandInvoker from '../commandInvoker';

export function loadCustomers() {
  return function(dispatch, getState) {
    var command = ordersDotCom.services.customerService.getAllCommand();
    return new CommandInvoker(dispatch).invoke(command, loadCustomersSuccess);
  }
};

export function saveCustomer(customer) {
  return function(dispatch, getState) {
    var service = ordersDotCom.services.customerService;
    var { command, actionFunc } = getFunctionsFor(customer);
    return new CommandInvoker(dispatch).invoke(command, actionFunc);

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

function loadCustomersSuccess(customers) {
  return { type: constants.actions.LOAD_CUSTOMERS_SUCCESS, customers: customers };
}

function insertCustomerSuccess(customer) {
  return { type: constants.actions.INSERT_CUSTOMER_SUCCESS, customer: customer };
}

function updateCustomerSuccess(customer) {
  return { type: constants.actions.UPDATE_CUSTOMER_SUCCESS, customer: customer };
}