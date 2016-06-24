var BusinessService = require('peasy-js').BusinessService;

function stripValues(customer) {
  var allowableFields = ['name', 'street'];
  Object.keys(customer).forEach(function(field) {
    if (allowableFields.indexOf(field) === -1) {
      delete customer[field];
    }
  });
}

var CustomerService = BusinessService.extend({
  functions: {
    _onInsertCommandInitialization: function(customer, context, done) {
      stripValues(customer);
      done();
    },
    _onUpdateCommandInitialization: function(customer, context, done) {
      stripValues(customer);
      done();
    }
  }
}).service;

module.exports = CustomerService;
