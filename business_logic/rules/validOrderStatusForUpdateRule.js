var Rule = require('peasy-js').Rule;

var ValidOrderStatusForUpdateRule = Rule.extend({
  params: ['orderId', 'orderItemService'],
  functions: {
    _onValidate: function(done) {
      this.orderItemService.getByOrderCommand(this.orderId).execute(function(err, result) {
        if (err) { return done(err); }
        if (result.value && result.some(function(item) { return item.status === "SHIPPED" })) {
          this._invalidate('This order cannot change because it contains items that have been shipped');
        }
      });
      done();
    }
  }
});

module.exports = ValidOrderStatusForUpdateRule;
