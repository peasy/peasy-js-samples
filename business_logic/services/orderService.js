var BusinessService = require('peasy-js').BusinessService;
var FieldRequiredRule = require('../rules/fieldRequiredRule');
var FieldLengthRule = require('../rules/fieldLengthRule');
var FieldTypeRule = require('../rules/fieldTypeRule');
var utils = require('../shared/utils');
var BaseService = require('../services/baseService');
var ValidOrderStatusForUpdateRule = require('../rules/validOrderStatusForUpdateRule');
var DeleteOrderCommand = require('../commands/deleteOrderCommand');

var OrderService = BusinessService.extendService(BaseService, {
  params: ['dataProxy', 'orderItemService'],
  functions: {
    _onInsertCommandInitialization: function(context, done) {
      var order = this.data;
      utils.stripAllFieldsFrom(order).except('customerId');
      order.orderDate = new Date();
      done();
    },
    _getRulesForInsertCommand: function(context, done) {
      var order = this.data;
      done(null, new FieldRequiredRule("customerId", order));
    },
    _onUpdateCommandInitialization: function(context, done) {
      var order = this.data;
      utils.stripAllFieldsFrom(order).except('id', 'customerId');
      done();
    },
    _getRulesForUpdateCommand: function(context, done) {
      var order = this.data;
      done(null, new ValidOrderStatusForUpdateRule(order.id, this.orderItemService));
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
    _getRules: function(context, done) {
      done(null, []);
    },
    _onValidationSuccess: function(context, done) {
      this.dataProxy.getByProduct(this.productId, function(err, result) {
        done(null, result);
      });
    }
  }
}).service;

OrderService.prototype.destroyCommand = function(orderId) {
  return new DeleteOrderCommand(orderId, this.dataProxy, this.orderItemService);
};

module.exports = OrderService;
