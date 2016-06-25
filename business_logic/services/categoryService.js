var BusinessService = require('peasy-js').BusinessService;
var FieldRequiredRule = require('../rules/fieldRequiredRule');
var utils = require('../shared/utils');

var CategoryService = BusinessService.extend({
  functions: {
    _onInsertCommandInitialization: function(category, context, done) {
      utils.stripAllFieldsFrom(category).except(['name', 'parentid']);
      done();
    },
    _getRulesForInsert: function(category, context, done) {
      done(null, new FieldRequiredRule("name", category));
    },
    _onUpdateCommandInitialization: function(category, context, done) {
      utils.stripAllFieldsFrom(category).except(['id', 'name', 'parentid']);
      done();
    },
    _getRulesForUpdate: function(category, context, done) {
      done(null, new FieldRequiredRule("name", category));
    }
  }
}).service;

module.exports = CategoryService;
