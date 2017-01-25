var BusinessService = require('peasy-js').BusinessService;
var FieldRequiredRule = require('../rules/fieldRequiredRule');
var FieldTypeRule = require('../rules/fieldTypeRule');
var utils = require('../shared/utils');
var BaseService = require('../services/baseService');
var CanDeleteCategoryRule = require('../rules/canDeleteCategoryRule');

var CategoryService = BusinessService.extendService(BaseService, {
  params: ['dataProxy', 'productService'],
  functions: {
    _onInsertCommandInitialization: function(context, done) {
      var category = this.data;
      utils.stripAllFieldsFrom(category).except(['name', 'parentid']);
      done();
    },
    _getRulesForInsertCommand: function(context, done) {
      var category = this.data;
      done(null, new FieldRequiredRule("name", category));
    },
    _onUpdateCommandInitialization: function(context, done) {
      var category = this.data;
      utils.stripAllFieldsFrom(category).except(['id', 'name', 'parentid']);
      category.id = parseInt(category.id, 10); // ensure id is numeric
      done();
    },
    _getRulesForUpdateCommand: function(context, done) {
      var category = this.data;
      done(null, [
        new FieldRequiredRule('id', category)
          .ifValidThenValidate(new FieldTypeRule('id', category.id, "number")),
        new FieldRequiredRule("name", category)
      ]); 
    },
    _getRulesForDestroyCommand: function(context, done) {
      var categoryId = this.id;
      done(null, new CanDeleteCategoryRule(categoryId, this.productService));
    }
  }
}).service;

module.exports = CategoryService;
