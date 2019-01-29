var BusinessService = require('peasy-js').BusinessService;
var FieldRequiredRule = require('../rules/fieldRequiredRule');
var utils = require('../shared/utils');
var stripAllFieldsFrom = utils.stripAllFieldsFrom;
var BaseService = require('../services/baseService');
var CanDeleteCategoryRule = require('../rules/canDeleteCategoryRule');

var CategoryService = BusinessService.extendService(BaseService, {
  params: ['dataProxy', 'productService', 'eventPublisher'],
  functions: {
    _onInsertCommandInitialization: function(category, context, done) {
      stripAllFieldsFrom(category).except(['name', 'parentid']);
      done();
    },
    _getRulesForInsertCommand: function(category, context, done) {
      done(null, new FieldRequiredRule("name", category));
    },
    _onUpdateCommandInitialization: function(category, context, done) {
      stripAllFieldsFrom(category).except(['id', 'name', 'parentid']);
      done();
    },
    _getRulesForUpdateCommand: function(category, context, done) {
      done(null, [
        new FieldRequiredRule('id', category),
        new FieldRequiredRule("name", category)
      ]);
    },
    _getRulesForDestroyCommand: function(categoryId, context, done) {
      done(null, new CanDeleteCategoryRule(categoryId, this.productService));
    }
  }
}).service;

module.exports = CategoryService;
