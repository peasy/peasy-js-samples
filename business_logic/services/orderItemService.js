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
var BaseService = require('../services/baseService');

var OrderItemService = BusinessService.extendService(BaseService, {
  params: ['dataProxy', 'productDataProxy', 'inventoryItemService'],
  functions: {
    _onInsertCommandInitialization: function(context, done) {
      var item = this.data;
      stripAllFieldsFrom(item).except(['orderId', 'productId', 'quantity', 'amount', 'price']);
      item.status = "PENDING";
      convert(item, "orderId").toInt();
      convert(item, "productId").toInt();
      convert(item, "quantity").toFloat();
      convert(item, "amount").toFloat();
      convert(item, "price").toFloat();
      done();
    },
    _getRulesForInsertCommand: function(context, done) {
      var item = this.data;
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
    _onUpdateCommandInitialization: function(context, done) {
      var item = this.data;
      stripAllFieldsFrom(item).except(['id', 'quantity', 'amount', 'price', 'productId', 'orderId']);
      convert(item, "orderId").toInt();
      convert(item, "productId").toInt();
      convert(item, "quantity").toFloat();
      convert(item, "amount").toFloat();
      convert(item, "price").toFloat();
      done();
    },
    _getRulesForUpdateCommand: function(context, done) {
      var item = this.data;
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
    _getRulesForDestroyCommand: function(context, done) {
      var orderItemDataProxy = this.dataProxy;
      orderItemDataProxy.getById(this.id, function(err, result) {
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
    _onValidationSuccess: function(context, done) {
      this.dataProxy.getByOrder(this.orderId, function(err, result) {
        if (err) { return done(err); }
        done(null, result);
      });
    }
  }
}).createCommand({
  name: 'submitCommand',
  params: ['orderItemId'],
  functions: {
    _getRules: function(context, done) {
      this.dataProxy.getById(this.orderItemId, function(err, result) {
        if (!result) {
          return done(new NotFoundError("order item not found"), null);
        }
        context.orderItem = result;
        done(null, new CanSubmitOrderItemRule(result));
      });
    },
    _onValidationSuccess: function(context, done) {
      var orderItem = context.orderItem;
      orderItem.status = "SUBMITTED";
      orderItem.submittedOn = new Date();
      this.dataProxy.update(orderItem, function(err, result) {
        done(null, result);
      });
    }
  }
}).service;

OrderItemService.prototype.shipCommand = function(orderItemId) {
  return new ShipOrderItemCommand(orderItemId, this.dataProxy, this.inventoryItemService);
}

module.exports = OrderItemService;
