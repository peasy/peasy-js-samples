var BusinessService = require('peasy-js').BusinessService;
var FieldRequiredRule = require('../rules/fieldRequiredRule');
var utils = require('../shared/utils');
var BaseService = require('../services/baseService');

var CategoryService = BusinessService.extendService(BaseService, {
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
      done();
    },
    _getRulesForUpdateCommand: function(context, done) {
      var category = this.data;
      done(null, new FieldRequiredRule("name", category));
    }
  }
}).service;

module.exports = CategoryService;
