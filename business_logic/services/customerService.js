var BusinessService = require('peasy-js').BusinessService;
var FieldRequiredRule = require('../rules/fieldRequiredRule');
var FieldLengthRule = require('../rules/fieldLengthRule');
var utils = require('../shared/utils');
var stripAllFieldsFrom = utils.stripAllFieldsFrom;
var BaseService = require('../services/baseService');
var CanDeleteCustomerRule = require('../rules/canDeleteCustomerRule');

var CustomerService = BusinessService.extendService(BaseService, {
  params: ['dataProxy', 'orderService', 'eventPublisher'],
  functions: {
    _onInsertCommandInitialization: function(data, context, done) {
      var customer = data;
      stripAllFieldsFrom(customer).except(['name', 'address']);
      stripAllFieldsFrom(customer.address).except(['street', 'zip']);
      done();
    },
    _getRulesForInsertCommand: function(data, context, done) {
      var customer = data;
      done(null, [
        new FieldRequiredRule("name", customer)
          .ifValidThenValidate(new FieldLengthRule("name", customer.name, 50))
      ]);
    },
    _onUpdateCommandInitialization: function(customer, context, done) {
      stripAllFieldsFrom(customer).except(['id', 'name', 'address']);
      stripAllFieldsFrom(customer.address).except(['street', 'zip']);
      done();
    },
    _getRulesForUpdateCommand: function(data, context, done) {
      var customer = data;
      done(null, [
        new FieldRequiredRule('id', customer),
        new FieldLengthRule("name", customer.name, 50)
      ]);
    },
    _getRulesForDestroyCommand: function(id, context, done) {
      var customerId = id;
      done(null, new CanDeleteCustomerRule(customerId, this.orderService));
    }
  }
}).service;

module.exports = CustomerService;
