var BusinessService = require('peasy-js').BusinessService;
var FieldRequiredRule = require('../rules/fieldRequiredRule');
var utils = require('../shared/utils');
var stripAllFieldsFrom = utils.stripAllFieldsFrom;
var BaseService = require('../services/baseService');
var ValidOrderStatusForUpdateRule = require('../rules/validOrderStatusForUpdateRule');
var DeleteOrderCommand = require('../commands/deleteOrderCommand');

var OrderService = BusinessService.extendService(BaseService, {
  params: ['dataProxy', 'orderItemService', 'eventPublisher'],
  functions: {
    _onInsertCommandInitialization: function(order, context, done) {
      stripAllFieldsFrom(order).except(['customerId']);
      order.orderDate = new Date();
      done();
    },
    _getRulesForInsertCommand: function(order, context, done) {
      done(null, new FieldRequiredRule("customerId", order));
    },
    _onUpdateCommandInitialization: function(order, context, done) {
      stripAllFieldsFrom(order).except(['id', 'customerId']);
      done();
    },
    _getRulesForUpdateCommand: function(order, context, done) {
      done(null, new ValidOrderStatusForUpdateRule(order.id, this.orderItemService));
    }
  }
}).createCommand({
  name: 'getByCustomerCommand',
  params: ['customerId'],
  functions: {
    _getRules: function(customerId, context, done) {
      done(null, [
        new FieldRequiredRule('customerId', { customerId: customerId })
      ]);
    },
    _onValidationSuccess: function(customerId, context, done) {
      this.dataProxy.getByCustomer(customerId, function(err, result) {
        done(null, result);
      });
    }
  }
}).createCommand({
  name: 'getByProductCommand',
  params: ['productId'],
  functions: {
    _getRules: function(productId, context, done) {
      done(null, [
        new FieldRequiredRule('productId', { productId: productId })
      ]);
    },
    _onValidationSuccess: function(productId, context, done) {
      this.dataProxy.getByProduct(productId, function(err, result) {
        done(null, result);
      });
    }
  }
}).service;

OrderService.prototype.destroyCommand = function(orderId) {
  return new DeleteOrderCommand(orderId, this.dataProxy, this.orderItemService, this.eventPublisher);
};

OrderService.prototype.hasPendingItems = function(orderId, orderItems) {
  return orderItems
    .filter(i => i.orderItem.orderId === orderId)
    .some(i => i.orderItem.status === "PENDING");
};

OrderService.prototype.status = function(orderItems) {
  if (!orderItems) return "";

  if (orderItems.some(i => i.status === "BACKORDERED")) {
    return "BACKORDERED";
  }

  if (orderItems.some(i => i.status === "PENDING")) {
    return "PENDING";
  }

  if (orderItems.some(i => i.status === "SUBMITTED")) {
    return "SUBMITTED";
  }

  if (orderItems.some(i => i.status === "SHIPPED")) {
    return "SHIPPED";
  }
}

module.exports = OrderService;
