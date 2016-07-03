var BusinessService = require('peasy-js').BusinessService;
var FieldRequiredRule = require('../rules/fieldRequiredRule');
var FieldLengthRule = require('../rules/fieldLengthRule');
var FieldTypeRule = require('../rules/fieldTypeRule');
var utils = require('../shared/utils');
var BaseService = require('../services/baseService');

var InventoryItemService = BusinessService.extendService(BaseService, {
  functions: {
    _onInsertCommandInitialization: function(context, done) {
      var item = this.data;
      utils.stripAllFieldsFrom(item).except(['quantityOnHand', 'productId']);
      item.version = 1;
      done();
    },
    _getRulesForInsertCommand: function(context, done) {
      var item = this.data;
      done(null, [
        new FieldRequiredRule("quantityOnHand", item)
             .ifValidThenValidate(new FieldTypeRule("quantityOnHand", item.quantityOnHand, "number")),
        new FieldRequiredRule("productId", item),
        new FieldLengthRule("version", item)
      ]);
    },
    _onUpdateCommandInitialization: function(context, done) {
      var item = this.data;
      utils.stripAllFieldsFrom(item).except(['id', 'quantityOnHand', 'productId', 'version']);
      done();
    },
    _getRulesForUpdateCommand: function(context, done) {
      var item = this.data;
      done(null, [
        new FieldRequiredRule("quantityOnHand", item)
             .ifValidThenValidate(new FieldTypeRule("quantityOnHand", item.quantityOnHand, "number")),
        new FieldRequiredRule("productId", item),
        new FieldRequiredRule("version", item)
             .ifValidThenValidate(new FieldTypeRule("version", item.version, "number")),
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
