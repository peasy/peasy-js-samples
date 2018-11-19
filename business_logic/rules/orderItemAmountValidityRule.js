var Rule = require('peasy-js').Rule;

var OrderItemAmountValidityRule = Rule.extend({
  association: "amount",
  params: ['orderItem', 'product'],
  functions: {
    _onValidate: function(orderItem, product, done) {
      if (orderItem.amount !== product.price * orderItem.quantity) {
        this._invalidate(`The amount for the ${product.name} order item does not equal the quantity multiplied by the current price in our system`);
      }
      done();
    }
  }
});

module.exports = OrderItemAmountValidityRule;
