var BusinessService = require('peasy-js').BusinessService;
var FieldRequiredRule = require('../rules/fieldRequiredRule');

function stripValues(category) {
  var allowableFields = ['name'];
  Object.keys(category).forEach(function(field) {
    if (allowableFields.indexOf(field) === -1) {
      delete category[field];
    }
  });
}

var CategoryService = BusinessService.extend({
  functions: {
    _onInsertCommandInitialization: function(category, context, done) {
      stripValues(category);
      done();
    },
    _getRulesForInsert: function(category, context, done) {
      done(null, new FieldRequiredRule("name", category));
    },
    _onUpdateCommandInitialization: function(category, context, done) {
      stripValues(category);
      done();
    },
    _getRulesForUpdate: function(category, context, done) {
      done(null, new FieldRequiredRule("name", category));
    },
  }
}).service;

module.exports = CategoryService;
