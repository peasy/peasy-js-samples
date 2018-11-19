var Rule = require('peasy-js').Rule;

var CanSubmitOrderItemRule = Rule.extend({
  params: ['orderItem'],
  functions: {
    _onValidate: function(orderItem, done) {
      if (orderItem.status !== "PENDING") {
        this._invalidate(`Order item ${orderItem.id} must be in a pending state to be submitted`);
      }
      done();
    }
  }
});

module.exports = CanSubmitOrderItemRule;
