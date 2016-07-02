var Rule = require('peasy-js').Rule;

var OrderItemAmountValidityRule = Rule.extend({
  params: ['orderItem', 'product'],
  functions: {
    _onValidate: function(done) {
      if (this.orderItem.amount !== this.product.price * this.product.quantity) {
        this._invalidate(`The amount for the ${this.product.name} order item does not equal the quanity multiplied by the current price in our system`);
      }
      done();
    }
  }
});

module.exports = OrderItemAmountValidityRule;
