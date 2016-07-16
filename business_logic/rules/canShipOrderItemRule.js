var Rule = require('peasy-js').Rule;

var CanShipOrderItemRule = Rule.extend({
  params: ['orderItem'],
  functions: {
    _onValidate: function(done) {
      var validStatuses = ["SUBMITTED", "BACKORDERED"];
      if (validStatuses.indexOf(this.orderItem.status) === -1) {
        this._invalidate(`Order item ${this.orderItem.id} is not in a shippable state`);
      }
      done();
    }
  }
});

module.exports = CanShipOrderItemRule;
