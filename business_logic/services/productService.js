var BusinessService = require('peasy-js').BusinessService;
var FieldRequiredRule = require('../rules/fieldRequiredRule');
var FieldLengthRule = require('../rules/fieldLengthRule');
var FieldTypeRule = require('../rules/fieldTypeRule');
var utils = require('../shared/utils');
var BaseService = require('../services/baseService');
var DeleteProductCommand = require('../commands/deleteProductCommand');

var ProductService = BusinessService.extendService(BaseService, {
  params: ['dataProxy', 'orderService', 'inventoryItemService'],
  functions: {
    _onInsertCommandInitialization: function(context, done) {
      var product = this.data;
      utils.stripAllFieldsFrom(product).except(['name', 'description', 'price', 'categoryId']);
      done();
    },
    _getRulesForInsertCommand: function(context, done) {
      var product = this.data;
      var orderService = this.productService;
      done(null, [
        new FieldRequiredRule("name", product)
             .ifValidThenValidate(new FieldLengthRule("name", product.name, 50)),
        new FieldRequiredRule("price", product)
             .ifValidThenValidate(new FieldTypeRule("price", product.price, "number")),
        new FieldRequiredRule("categoryId", product)
      ]);
    },
    _onUpdateCommandInitialization: function(context, done) {
      var product = this.data;
      utils.stripAllFieldsFrom(product).except(['id', 'name', 'description', 'price', 'categoryId']);
      done();
    },
    _getRulesForUpdateCommand: function(context, done) {
      var product = this.data;
      done(null, [
        new FieldLengthRule("name", product.name, 50),
        new FieldTypeRule("price", product.price, "number")
      ]);
    }
  }
}).createCommand({
  name: 'getByCategoryCommand',
  params: ['categoryId'],
  functions: {
    _onValidationSuccess: function(context, done) {
      this.dataProxy.getByCategory(this.categoryId, function(err, result) {
        done(null, result);
      });
    }
  }
}).service;

ProductService.prototype.destroyCommand = function(productId) {
  return new DeleteProductCommand(productId, this.dataProxy, this.orderService, this.inventoryItemService);
};

module.exports = ProductService;
