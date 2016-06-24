var BusinessService = require('peasy-js').BusinessService;
var FieldRequiredRule = require('../rules/fieldRequiredRule');
var utils = require('../shared/utils');

var CustomerService = BusinessService.extend({
  functions: {
    _onInsertCommandInitialization: function(customer, context, done) {
      utils.stripAllFieldsFrom(customer).except(['name']);
      done();
    },
    _getRulesForInsert: function(customer, context, done) {
      done(null, new FieldRequiredRule("name", customer));
    },
    _onUpdateCommandInitialization: function(customer, context, done) {
      utils.stripAllFieldsFrom(customer).except(['id', 'name']);
      done();
    },
    _getRulesForUpdate: function(customer, context, done) {
      done(null, new FieldRequiredRule("name", customer));
    }
  }
}).service;

module.exports = CustomerService;
