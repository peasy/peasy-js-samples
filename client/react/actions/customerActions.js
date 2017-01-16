export function createCustomer(customer) {
  return { type: 'CREATE_CUSTOMER', customer: customer }
};