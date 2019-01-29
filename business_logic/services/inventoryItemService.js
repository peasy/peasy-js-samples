var BusinessService = require('peasy-js').BusinessService;
var FieldRequiredRule = require('../rules/fieldRequiredRule');
var FieldTypeRule = require('../rules/fieldTypeRule');
var utils = require('../shared/utils');
var convert = utils.convert;
var stripAllFieldsFrom = utils.stripAllFieldsFrom;
var BaseService = require('../services/baseService');

var InventoryItemService = BusinessService.extendService(BaseService, {
  params: ['dataProxy', 'eventPublisher'],
  functions: {
    _onInsertCommandInitialization: function(item, context, done) {
      stripAllFieldsFrom(item).except(['quantityOnHand', 'productId']);
      item.quantityOnHand = item.quantityOnHand || 0;
      item.version = 1;
      done();
    },
    _getRulesForInsertCommand: function(item, context, done) {
      done(null, [
        new FieldTypeRule("quantityOnHand", item.quantityOnHand, "number"),
        new FieldRequiredRule("productId", item),
        new FieldRequiredRule("version", item)
             .ifValidThenValidate(new FieldTypeRule("version", item.version, "number")),
      ]);
    },
    _onUpdateCommandInitialization: function(item, context, done) {
      stripAllFieldsFrom(item).except(['id', 'quantityOnHand', 'version', 'productId']);
      convert(item, "quantityOnHand").toFloat();
      convert(item, "version").toInt();
      done();
    },
    _getRulesForUpdateCommand: function(item, context, done) {
      done(null, [
        new FieldRequiredRule('id', item),
        new FieldTypeRule("quantityOnHand", item.quantityOnHand, "number"),
        new FieldRequiredRule("version", item)
          .ifValidThenValidate(new FieldTypeRule("version", item.version, "number")),
      ]);
    }
  }
}).createCommand({
  name: 'getByProductCommand',
  params: ['productId'],
  functions: {
    _onValidationSuccess: function(productId, context, done) {
      this.dataProxy.getByProduct(productId, function(err, result) {
        done(null, result);
      });
    }
  }
}).service;


module.exports = InventoryItemService;
