var BusinessService = require('peasy-js').BusinessService;
var FieldRequiredRule = require('../rules/fieldRequiredRule');
var FieldLengthRule = require('../rules/fieldLengthRule');
var FieldTypeRule = require('../rules/fieldTypeRule');
var utils = require('../shared/utils');

var ProductService = BusinessService.extend({
  functions: {
    _onInsertCommandInitialization: function(product, context, done) {
      utils.stripAllFieldsFrom(product).except(['name', 'description', 'price', 'categoryid']);
      done();
    },
    _getRulesForInsert: function(product, context, done) {
      done(null, [
        new FieldRequiredRule("name", product)
              .ifValidThenValidate(new FieldLengthRule("name", product.name, 50)),
        new FieldRequiredRule("price", product)
             .ifValidThenValidate(new FieldTypeRule("price", product.price, "number")),
        new FieldRequiredRule("categoryid", product)
             .ifValidThenValidate(new FieldTypeRule("categoryid", product.categoryid, "number")),
      ]);
    },
    _onUpdateCommandInitialization: function(product, context, done) {
      utils.stripAllFieldsFrom(product).except(['id', 'name', 'description', 'price', 'categoryid']);
      done();
    },
    _getRulesForUpdate: function(product, context, done) {
      done([
        new FieldLengthRule("name", product.name, 50),
        new FieldTypeRule("price", product.price, "number"),
        new FieldTypeRule("categoryid", product.categoryid, "number")
      ]);
    }
  }
}).service;

module.exports = ProductService;
