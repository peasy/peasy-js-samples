var BusinessService = require('peasy-js').BusinessService;
var FieldRequiredRule = require('../rules/fieldRequiredRule');
var FieldLengthRule = require('../rules/fieldLengthRule');
var FieldTypeRule = require('../rules/fieldTypeRule');
var utils = require('../shared/utils');

var ProductService = BusinessService.extend({
  functions: {
    _onInsertCommandInitialization: function(product, context, done) {
      utils.stripAllFieldsFrom(product).except(['name', 'description', 'price', 'categoryId']);
      done();
    },
    _getRulesForInsert: function(product, context, done) {
      done(null, [
        new FieldRequiredRule("name", product)
             .ifValidThenValidate(new FieldLengthRule("name", product.name, 50)),
        new FieldRequiredRule("price", product)
             .ifValidThenValidate(new FieldTypeRule("price", product.price, "number")),
        new FieldRequiredRule("categoryId", product)
      ]);
    },
    _onUpdateCommandInitialization: function(product, context, done) {
      utils.stripAllFieldsFrom(product).except(['id', 'name', 'description', 'price', 'categoryId']);
      done();
    },
    _getRulesForUpdate: function(product, context, done) {
      done([
        new FieldLengthRule("name", product.name, 50),
        new FieldTypeRule("price", product.price, "number"),
        new FieldTypeRule("categoryId", product.categoryId, "number")
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


module.exports = ProductService;
