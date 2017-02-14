var Rule = require('peasy-js').Rule;

var CanDeleteProductRule = Rule.extend({
  params: ['productId', 'orderService'],
  functions: {
    _onValidate: function(done) {
      var self = this;
      this.orderService.getByProductCommand(this.productId).execute(function(err, result) {
        if (err) { return done(err); }
        if (result.value && result.value.length > 0) {
          self._invalidate("This product is associated with one or more orders and cannot be deleted");
        }
        done(result.errors);
      });
    }
  }
});

module.exports = CanDeleteProductRule;
