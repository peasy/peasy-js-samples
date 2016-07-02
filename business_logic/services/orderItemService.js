var BusinessService = require('peasy-js').BusinessService;
var Rule = require('peasy-js').Rule;
var FieldRequiredRule = require('../rules/fieldRequiredRule');
var FieldTypeRule = require('../rules/fieldTypeRule');
var OrderItemPriceValidityRule = require('../rules/orderItemPriceValidityRule');
var OrderItemAmountValidityRule = require('../rules/orderItemAmountValidityRule');
var ValidOrderItemStatusForUpdateRule = require('../rules/validOrderItemStatusForUpdateRule');
var CanSubmitOrderItemRule = require('../rules/canSubmitOrderItemRule');
var utils = require('../shared/utils');
var NotFoundError = require('../shared/notFoundError');

var OrderItemService = BusinessService.extend({
  params: ['dataProxy', 'productService'],
  functions: {
    _onInsertCommandInitialization: function(context, done) {
      var item = this.data;
      utils.stripAllFieldsFrom(item).except(['orderId', 'productId', 'quantity', 'amount', 'price']);
      item.status = "PENDING";
      done();
    },
    _getRulesForInsertCommand: function(context, done) {
      var item = this.data;
      var productService = this.productService;
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
          productService.getByIdCommand(item.productId).execute(function(err, result) {
            if (err) { return done(err); }
            var product = result.value;
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
      utils.stripAllFieldsFrom(item).except(['id', 'quantity', 'amount', 'price']);
      done();
    },
    _getRulesForUpdateCommand: function(context, done) {
      var item = this.data;
      var productService = this.productService;
      done(null,
        Rule.ifAllValid([
          new FieldRequiredRule("quantity", item)
               .ifValidThenValidate(new FieldTypeRule("quantity", item.quantity, "number")),
          new FieldRequiredRule("amount", item)
               .ifValidThenValidate(new FieldTypeRule("amount", item.amount, "number")),
          new FieldRequiredRule("price", item)
        ]).thenGetRules(function(done) {
          productService.getByIdCommand(item.productId).execute(function(err, result) {
            if (err) { return done(err); }
            var product = result.value;
            done(null, new ValidOrderItemStatusForUpdateRule(product)
                            .ifValidThenValidate([
                              new OrderItemPriceValidityRule(item, product),
                              new OrderItemAmountValidityRule(item, product)
                            ])
            );
          });
        })
      );
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
}).createCommand({
  name: 'shipCommand',
  params: ['orderItemId'],
  functions: {
    _onValidationSuccess: function(context, done) {
      this.dataProxy.getByProduct(this.productId, function(err, result) {
        done(null, result);
      });
    }
  }
}).service;

module.exports = OrderItemService;
