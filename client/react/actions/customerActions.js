import constants from '../constants';
import ordersDotCom from '../../businessLogic';
import CommandInvoker from '../commandInvoker';

class ActionsBase {
  constructor(service) {
    this._service = service;
  }

  insertAction() { }

  updateAction() { }

  deleteAction() { }

  loadData() {

  }

  save(data) {

  }

  delete(id) {

  }
}

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

export function destroyCustomer(id) {
  return function(dispatch, getState) {
    var command = ordersDotCom.services.customerService.destroyCommand(id);
    return new CommandInvoker(dispatch).invoke(command, destroyCustomerSuccess(id));
  }
}

function loadCustomersSuccess(customers) {
  return { type: constants.actions.LOAD_CUSTOMERS_SUCCESS, customers: customers };
}

function insertCustomerSuccess(customer) {
  return { type: constants.actions.INSERT_CUSTOMER_SUCCESS, customer: customer };
}

function updateCustomerSuccess(customer) {
  return { type: constants.actions.UPDATE_CUSTOMER_SUCCESS, customer: customer };
}

function destroyCustomerSuccess(id) {
  return () => {
    return { type: constants.actions.DESTROY_CUSTOMER_SUCCESS, id: id };
  }
}