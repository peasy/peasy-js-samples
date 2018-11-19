var Rule = require('peasy-js').Rule;

var ValidOrderItemStatusForUpdateRule = Rule.extend({
  params: ['orderItem'],
  functions: {
    _onValidate: function(orderItem, done) {
      if (orderItem.status.toUpperCase() === "BACKORDERED") {
        this._invalidate('Backordered items cannot be changed');
      } else if (orderItem.status.toUpperCase() === "SHIPPED") {
        this._invalidate('Shipped items cannot be changed');
      }
      done();
    }
  }
});

module.exports = ValidOrderItemStatusForUpdateRule;
