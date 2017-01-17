import constants from '../constants';

export function createCustomer(customer) {
  return { type: constants.actions.CREATE_CUSTOMER, customer: customer }
};