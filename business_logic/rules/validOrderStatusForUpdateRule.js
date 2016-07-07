var Rule = require('peasy-js').Rule;

var ValidOrderStatusForUpdateRule = Rule.extend({
  params: ['orderId', 'orderItemService'],
  functions: {
    _onValidate: function(done) {
      var self = this;
      self.orderItemService.getByOrderCommand(self.orderId).execute(function(err, result) {
        if (err) { return done(err); }
        if (result.value) {
          var shippedItems = result.value.some(function(item) { return item.status === "SHIPPED" });
          if (shippedItems) {
            self._invalidate('This order cannot change because it contains items that have been shipped');
          }
        }
        done();
      });
    }
  }
});

module.exports = ValidOrderStatusForUpdateRule;
