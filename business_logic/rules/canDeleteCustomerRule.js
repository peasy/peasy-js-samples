var Rule = require('peasy-js').Rule;

var CanDeleteCustomerRule = Rule.extend({
  params: ['customerId', 'orderService'],
  functions: {
    _onValidate: function(customerId, orderService, done) {
      var self = this;
      orderService.getByCustomerCommand(customerId).execute(function(err, result) {
        if (err) { return done(err); }
        if (result.value && result.value.length > 0) {
          self._invalidate("This customer is associated with one or more orders and cannot be deleted");
        }
        done(result.errors);
      });
    }
  }
});

module.exports = CanDeleteCustomerRule;
