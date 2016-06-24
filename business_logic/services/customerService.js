var BusinessService = require('peasy-js').BusinessService;
var utils = require('../shared/utils');

var CustomerService = BusinessService.extend({
  functions: {
    _onInsertCommandInitialization: function(customer, context, done) {
      utils.stripAllFieldsFrom(customer).except('name');
      done();
    },
    _onUpdateCommandInitialization: function(customer, context, done) {
      utils.stripAllFieldsFrom(customer).except(['id', 'name']);
      done();
    }
  }
}).service;

module.exports = CustomerService;
