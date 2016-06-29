var BusinessService = require('peasy-js').BusinessService;
var FieldRequiredRule = require('../rules/fieldRequiredRule');
var FieldLengthRule = require('../rules/fieldLengthRule');
var FieldTypeRule = require('../rules/fieldTypeRule');
var utils = require('../shared/utils');

var OrderService = BusinessService.extend({
  functions: {
    _onInsertCommandInitialization: function(customer, context, done) {
      utils.stripAllFieldsFrom(customer).except('customerId');
      customer.orderDate = new Date();
      done();
    },
    _getRulesForInsert: function(customer, context, done) {
      done(null, new FieldRequiredRule("customerId", customer));
    },
    _onUpdateCommandInitialization: function(customer, context, done) {
      utils.stripAllFieldsFrom(customer).except('id', 'customerId');
      done();
    }
  }
}).createCommand({
  name: 'getByCustomerCommand',
  params: ['customerId'],
  functions: {
    _onValidationSuccess: function(context, done) {
      this.dataProxy.getByCustomer(this.customerId, function(err, result) {
        done(null, result);
      });
    }
  }
}).createCommand({
  name: 'getByProductCommand',
  params: ['productId'],
  functions: {
    _onValidationSuccess: function(context, done) {
      this.dataProxy.getByProduct(this.productId, function(err, result) {
        done(null, result);
      });
    }
  }
}).service;

module.exports = OrderService;
