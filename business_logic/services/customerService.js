var BusinessService = require('peasy-js').BusinessService;
var FieldRequiredRule = require('../rules/fieldRequiredRule');
var FieldLengthRule = require('../rules/fieldLengthRule');
var utils = require('../shared/utils');

var CustomerService = BusinessService.extend({
  functions: {
    _onInsertCommandInitialization: function(context, done) {
      var customer = this.data;
      utils.stripAllFieldsFrom(customer).except(['name', 'address']);
      utils.stripAllFieldsFrom(customer.address).except(['street', 'zip']);
      done();
    },
    _getRulesForInsertCommand: function(context, done) {
      var customer = this.data;
      done(null, [
        new FieldRequiredRule("name", customer),
        new FieldLengthRule("name", customer.name, 50)
      ]);
    },
    _onUpdateCommandInitialization: function(context, done) {
      var customer = this.data;
      utils.stripAllFieldsFrom(customer).except(['id', 'name', 'address']);
      done();
    },
    _getRulesForUpdateCommand: function(context, done) {
      var customer = this.data;
      done(null, new FieldRequiredRule("name", customer));
    }
  }
}).service;

module.exports = CustomerService;
