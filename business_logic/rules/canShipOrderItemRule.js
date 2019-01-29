var Rule = require('peasy-js').Rule;

var CanShipOrderItemRule = Rule.extend({
  params: ['orderItem'],
  functions: {
    _onValidate: function(orderItem, done) {
      var validStatuses = ["SUBMITTED", "BACKORDERED"];
      if (validStatuses.indexOf(orderItem.status) === -1) {
        this._invalidate(`Order item ${orderItem.id} is not in a shippable state`);
      }
      done();
    }
  }
});

module.exports = CanShipOrderItemRule;
