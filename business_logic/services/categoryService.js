var BusinessService = require('peasy-js').BusinessService;

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
    _onUpdateCommandInitialization: function(category, context, done) {
      stripValues(category);
      done();
    }
  }
}).service;

module.exports = CategoryService;
