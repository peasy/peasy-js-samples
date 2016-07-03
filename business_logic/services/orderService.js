var BusinessService = require('peasy-js').BusinessService;
var FieldRequiredRule = require('../rules/fieldRequiredRule');
var FieldLengthRule = require('../rules/fieldLengthRule');
var FieldTypeRule = require('../rules/fieldTypeRule');
var utils = require('../shared/utils');
var BaseService = require('../services/baseService');

var OrderService = BusinessService.extendService(BaseService, {
  functions: {
    _onInsertCommandInitialization: function(context, done) {
      var customer = this.data;
      utils.stripAllFieldsFrom(customer).except('customerId');
      customer.orderDate = new Date();
      done();
    },
    _getRulesForInsertCommand: function(context, done) {
      var customer = this.data;
      done(null, new FieldRequiredRule("customerId", customer));
    },
    _onUpdateCommandInitialization: function(context, done) {
      var customer = this.data;
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
