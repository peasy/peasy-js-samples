var Rule = require('peasy-js').Rule;

var ValidOrderItemStatusForDeleteRule = Rule.extend({
  params: ['orderItem'],
  functions: {
    _onValidate: function(done) {
      if (this.orderItem.status.toUpperCase() === "SHIPPED") {
        this._invalidate('Shipped items cannot be deleted');
      }
      done();
    }
  }
});

module.exports = ValidOrderItemStatusForDeleteRule;
