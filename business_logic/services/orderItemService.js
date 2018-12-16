var BusinessService = require('peasy-js').BusinessService;
var Rule = require('peasy-js').Rule;
var FieldRequiredRule = require('../rules/fieldRequiredRule');
var FieldTypeRule = require('../rules/fieldTypeRule');
var OrderItemPriceValidityRule = require('../rules/orderItemPriceValidityRule');
var OrderItemAmountValidityRule = require('../rules/orderItemAmountValidityRule');
var ValidOrderItemStatusForUpdateRule = require('../rules/validOrderItemStatusForUpdateRule');
var ValidOrderItemStatusForDeleteRule = require('../rules/validOrderItemStatusForDeleteRule');
var CanSubmitOrderItemRule = require('../rules/canSubmitOrderItemRule');
var utils = require('../shared/utils');
var convert = utils.convert;
var stripAllFieldsFrom = utils.stripAllFieldsFrom;
var NotFoundError = require('../shared/notFoundError');
var ShipOrderItemCommand = require('../commands/shipOrderItemCommand');
var BaseService = require('./baseService');

var OrderItemService = BusinessService.extendService(BaseService, {
  params: ['dataProxy', 'productDataProxy', 'inventoryItemService', 'eventPublisher'],
  functions: {
    _onInsertCommandInitialization: function(item, context, done) {
      stripAllFieldsFrom(item).except(['orderId', 'productId', 'quantity', 'amount', 'price']);
      item.status = "PENDING";
      convert(item, "quantity").toFloat();
      convert(item, "amount").toFloat();
      convert(item, "price").toFloat();
      done();
    },
    _getRulesForInsertCommand: function(item, context, done) {
      var productDataProxy = this.productDataProxy;
      done(null, [
        Rule.ifAllValid([
          new FieldRequiredRule("quantity", item)
            .ifValidThenValidate(new FieldTypeRule("quantity", item.quantity, "number")),
          new FieldRequiredRule("amount", item)
            .ifValidThenValidate(new FieldTypeRule("amount", item.amount, "number")),
          new FieldRequiredRule("price", item)
            .ifValidThenValidate(new FieldTypeRule("price", item.price, "number")),
          new FieldRequiredRule("productId", item),
          new FieldRequiredRule("orderId", item)
        ]).thenGetRules(function(done) {
          productDataProxy.getById(item.productId, function(err, product) {
            if (err) { return done(err); }
            done(null, [
              new OrderItemPriceValidityRule(item, product),
              new OrderItemAmountValidityRule(item, product)
            ]);
          });
        })
      ]);
    },
    _onUpdateCommandInitialization: function(item, context, done) {
      stripAllFieldsFrom(item).except(['id', 'quantity', 'amount', 'price', 'productId', 'orderId']);
      convert(item, "quantity").toFloat();
      convert(item, "amount").toFloat();
      convert(item, "price").toFloat();
      done();
    },
    _getRulesForUpdateCommand: function(item, context, done) {
      var productDataProxy = this.productDataProxy;
      var orderItemDataProxy = this.dataProxy;
      done(null,
        Rule.ifAllValid([
          new FieldRequiredRule("quantity", item)
            .ifValidThenValidate(new FieldTypeRule("quantity", item.quantity, "number")),
          new FieldRequiredRule("amount", item)
            .ifValidThenValidate(new FieldTypeRule("amount", item.amount, "number")),
          new FieldRequiredRule("price", item)
        ]).thenGetRules(function(done) {
          orderItemDataProxy.getById(item.id, function(err, result) {
            if (err) { return done(err); }
            var savedItem = result;
            productDataProxy.getById(item.productId, function(err, product) {
              if (err) { return done(err); }
              done(null, new ValidOrderItemStatusForUpdateRule(savedItem)
                .ifValidThenValidate([
                  new OrderItemPriceValidityRule(item, product),
                  new OrderItemAmountValidityRule(item, product)
                ])
              );
            });
          });
        })
      );
    },
    _getRulesForDestroyCommand: function(id, context, done) {
      var orderItemDataProxy = this.dataProxy;
      orderItemDataProxy.getById(is.id, function(err, result) {
        if (err) { return done(err); }
        var savedItem = result;
        done(null, new ValidOrderItemStatusForDeleteRule(savedItem));
      });
    }
  }
}).createCommand({
  name: 'getByOrderCommand',
  params: ['orderId'],
  functions: {
    _onValidationSuccess: function(orderId, context, done) {
      this.dataProxy.getByOrder(orderId, function(err, result) {
        if (err) { return done(err); }
        done(null, result);
      });
    }
  }
}).createCommand({
  name: 'submitCommand',
  params: ['orderItemId'],
  functions: {
    _getRules: function(orderItemId, context, done) {
      this.dataProxy.getById(orderItemId, function(err, result) {
        if (!result) {
          return done(new NotFoundError("order item not found"), null);
        }
        context.orderItem = result;
        done(null, new CanSubmitOrderItemRule(result));
      });
    },
    _onValidationSuccess: function(orderItemId, context, done) {
      var orderItem = context.orderItem;
      var eventPublisher = this.eventPublisher || { publish: () => {} };
      orderItem.status = "SUBMITTED";
      orderItem.submittedOn = new Date();
      this.dataProxy.update(orderItem, function(err, result) {
        if (err) return done(err);
        eventPublisher.publish({
          type: 'update',
          data: result
        });
        done(null, result);
      });
    }
  }
}).service;

OrderItemService.prototype.shipCommand = function(orderItemId) {
  return new ShipOrderItemCommand(orderItemId, this.dataProxy, this.inventoryItemService, this.eventPublisher);
}

OrderItemService.prototype.canDelete = function(orderItem) {
  return orderItem.status !== "SHIPPED";
}

OrderItemService.prototype.canShip = function(orderItem) {
  return orderItem.status === "SUBMITTED" ||
         orderItem.status === "BACKORDERED";
}

module.exports = OrderItemService;
