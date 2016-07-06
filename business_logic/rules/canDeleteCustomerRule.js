var Rule = require('peasy-js').Rule;

var CanDeleteCustomerRule = Rule.extend({
  params: ['customerId', 'orderService'],
  functions: {
    _onValidate: function(done) {
      var self = this;
      console.log("MEH", this.orderService);
      this.orderService.getByCustomerCommand(this.customerId).execute(function(err, result) {
        if (err) { return done(err); }
        if (result.value && result.value.length > 0) {
          self._invalidate("This customer is associated with one or more orders and cannot be deleted");
        }
        done();
      });
    }
  }
});

module.exports = CanDeleteCustomerRule;
