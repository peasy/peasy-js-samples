var BusinessService = require('peasy-js').BusinessService;
var FieldRequiredRule = require('../rules/fieldRequiredRule');
var FieldLengthRule = require('../rules/fieldLengthRule');
var FieldTypeRule = require('../rules/fieldTypeRule');
var utils = require('../shared/utils');

var InventoryItemService = BusinessService.extend({
  functions: {
    _onInsertCommandInitialization: function(item, context, done) {
      utils.stripAllFieldsFrom(item).except(['quantityOnHand', 'productId']);
      //item.version = 1;
      done();
    },
    _getRulesForInsert: function(item, context, done) {
      done(null, [
        new FieldRequiredRule("quantityOnHand", item)
             .ifValidThenValidate(new FieldTypeRule("quantityOnHand", item.quantityOnHand, "number")),
        new FieldRequiredRule("productId", item),
        new FieldLengthRule("version", item)
      ]);
    },
    _onUpdateCommandInitialization: function(item, context, done) {
      utils.stripAllFieldsFrom(item).except(['id', 'quantityOnHand', 'productId', 'version']);
      done();
    },
    _getRulesForUpdate: function(item, context, done) {
      done(null, [
        new FieldRequiredRule("quantityOnHand", item)
             .ifValidThenValidate(new FieldTypeRule("quantityOnHand", item.quantityOnHand, "number")),
        new FieldRequiredRule("productId", item)
      ]);
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


module.exports = InventoryItemService;
