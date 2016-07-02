var Rule = require('peasy-js').Rule;

var CanShipOrderItemRule = Rule.extend({
  params: ['orderItem'],
  functions: {
    _onValidate: function(done) {
      if (this.orderItem.status !== "PENDING") {
        this._invalidate(`Order item ${this.orderItem.id} must be in a pending state to be submitted`);
      }
      done();
    }
  }
});

module.exports = CanShipOrderItemRule;
