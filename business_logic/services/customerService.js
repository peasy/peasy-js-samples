var BusinessService = require('peasy-js').BusinessService;
var FieldRequiredRule = require('../rules/fieldRequiredRule');
var FieldLengthRule = require('../rules/fieldLengthRule');
var utils = require('../shared/utils');
var BaseService = require('../services/baseService');
var CanDeleteCustomerRule = require('../rules/canDeleteCustomerRule');

var CustomerService = BusinessService.extendService(BaseService, {
  params: ['dataProxy', 'orderService'],
  functions: {
    _onInsertCommandInitialization: function(context, done) {
      var customer = this.data;
      utils.stripAllFieldsFrom(customer).except(['name', 'address']);
      utils.stripAllFieldsFrom(customer.address).except(['street', 'zip']);
      done();
    },
    _getRulesForInsertCommand: function(context, done) {
      var customer = this.data;
      done(null, [
        new FieldRequiredRule("name", customer),
        new FieldLengthRule("name", customer.name, 50)
      ]);
    },
    _onUpdateCommandInitialization: function(context, done) {
      var customer = this.data;
      utils.stripAllFieldsFrom(customer).except(['id', 'name', 'address']);
      done();
    },
    _getRulesForUpdateCommand: function(context, done) {
      var customer = this.data;
      done(null, new FieldRequiredRule("name", customer));
    },
    _getRulesForDestroyCommand: function(context, done) {
      var customerId = this.id;
      done(null, new CanDeleteCustomerRule(customerId, this.orderService));
    }
  }
}).service;

module.exports = CustomerService;
