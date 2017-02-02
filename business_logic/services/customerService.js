var BusinessService = require('peasy-js').BusinessService;
var FieldRequiredRule = require('../rules/fieldRequiredRule');
var FieldLengthRule = require('../rules/fieldLengthRule');
var FieldTypeRule = require('../rules/fieldTypeRule');
var utils = require('../shared/utils');
var convert = utils.convert;
var stripAllFieldsFrom = utils.stripAllFieldsFrom;
var BaseService = require('../services/baseService');
var CanDeleteCustomerRule = require('../rules/canDeleteCustomerRule');

var CustomerService = BusinessService.extendService(BaseService, {
  params: ['dataProxy', 'orderService'],
  functions: {
    _onInsertCommandInitialization: function(context, done) {
      var customer = this.data;
      stripAllFieldsFrom(customer).except(['name', 'address']);
      stripAllFieldsFrom(customer.address).except(['street', 'zip']);
      done();
    },
    _getRulesForInsertCommand: function(context, done) {
      var customer = this.data;
      done(null, [
        new FieldRequiredRule("name", customer)
          .ifValidThenValidate(new FieldLengthRule("name", customer.name, 50))
      ]);
    },
    _onUpdateCommandInitialization: function(context, done) {
      var customer = this.data;
      stripAllFieldsFrom(customer).except(['id', 'name', 'address']);
      stripAllFieldsFrom(customer.address).except(['street', 'zip']);
      convert(customer, "id").toInt();
      done();
    },
    _getRulesForUpdateCommand: function(context, done) {
      var customer = this.data;
      done(null, [
        new FieldRequiredRule('id', customer)
          .ifValidThenValidate(new FieldTypeRule('id', customer.id, "number")),
        new FieldLengthRule("name", customer.name, 50)
      ]); 
    },
    _getRulesForDestroyCommand: function(context, done) {
      var customerId = this.id;
      done(null, new CanDeleteCustomerRule(customerId, this.orderService));
    }
  }
}).service;

module.exports = CustomerService;
