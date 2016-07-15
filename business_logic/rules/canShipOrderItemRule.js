var Rule = require('peasy-js').Rule;

var CanShipOrderItemRule = Rule.extend({
  params: ['orderItem'],
  functions: {
    _onValidate: function(done) {
      if (this.orderItem.status !== "SUBMITTED" && this.orderItem.status !== "BACKORDERED") {
        this._invalidate(`Order item ${this.orderItem.id} is not in a shippable state`);
      }
      done();
    }
  }
});

module.exports = CanShipOrderItemRule;
