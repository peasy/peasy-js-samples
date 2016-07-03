var Rule = require('peasy-js').Rule;

var CanShipOrderItemRule = Rule.extend({
  params: ['orderItem'],
  functions: {
    _onValidate: function(done) {
      if (this.orderItem.status !== "SUBMITTED") {
        this._invalidate(`Order item ${this.orderItem.id} must be in a submitted state to be shipped`);
      }
      done();
    }
  }
});

module.exports = CanShipOrderItemRule;
