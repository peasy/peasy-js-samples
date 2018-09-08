var Command = require('peasy-js').Command;
var CanShipOrderItemRule = require('../rules/canShipOrderItemRule');
var CanDeleteProductRule = require('../rules/canDeleteProductRule');
var utils = require('../shared/utils');
var convert = utils.convert;
var stripAllFieldsFrom = utils.stripAllFieldsFrom;
var FieldRequiredRule = require('../rules/fieldRequiredRule');
var FieldLengthRule = require('../rules/fieldLengthRule');
var FieldTypeRule = require('../rules/fieldTypeRule');

var CreateProductCommand = Command.extend({
  params: ['product', 'productDataProxy', 'inventoryItemService', 'eventPublisher'],
  functions: {
    _onInitialization: function(context, done) {
      var product = this.product;
      convert(product, "price").toFloat();
      stripAllFieldsFrom(product).except(['name', 'description', 'price', 'categoryId']);
      done();
    },
    _getRules: function(context, done) {
      var product = this.product;
      done(null, [
        new FieldRequiredRule("name", product)
             .ifValidThenValidate(new FieldLengthRule("name", product.name, 50)),
        new FieldRequiredRule("price", product)
             .ifValidThenValidate(new FieldTypeRule("price", product.price, "number")),
        new FieldRequiredRule("categoryId", product)
      ]);
    },
    _onValidationSuccess: function(context, done) {
      var inventoryService = this.inventoryItemService;
      var newProduct;
      var eventPublisher = this.eventPublisher || { publish: () => {} };
      this.productDataProxy.insert(this.product, function(err, result) {
        if (err) { return done(err); }
        eventPublisher.publish({
          type: 'insert',
          data: result
        });
        newProduct = result;
        var inventoryItem = {
          productId: newProduct.id,
          quantityOnHand: 0
        };
        inventoryService.insertCommand(inventoryItem).execute(function(err, result) {
          if (err) { return done(err); }
          done(null, newProduct);
        });
      });
    }
  }
});

module.exports = CreateProductCommand;
