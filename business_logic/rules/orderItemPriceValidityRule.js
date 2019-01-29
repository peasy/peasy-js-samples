var Rule = require('peasy-js').Rule;

var OrderItemPriceValidityRule = Rule.extend({
  association: "price",
  params: ['orderItem', 'product'],
  functions: {
    _onValidate: function(orderItem, product, done) {
      if (orderItem.price !== product.price) {
        this._invalidate(`The price for ${product.name} no longer reflects the current price in our system`);
      }
      done();
    }
  }
});

module.exports = OrderItemPriceValidityRule;
