import constants from '../constants';
import ordersDotCom from '../../businessLogic';
import {beginAsyncInvocation, endAsyncInvocation} from './asyncStatusActions';

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

    dispatch(beginAsyncInvocation());
    command.execute((err, result) => {
      dispatch(endAsyncInvocation());
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

    dispatch(beginAsyncInvocation());

    return new Promise((resolve, reject) => {
      command.execute((err, result) => {
        dispatch(endAsyncInvocation());
        if (!err) {
          if (result.success) {
            return resolve(dispatch(actionFunc(result.value)));
          }
          return reject(result.errors);
        }
        reject(err);
      });
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