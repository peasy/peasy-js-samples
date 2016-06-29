var Rule = require('peasy-js').Rule;

var OrderItemPriceValidityRule = Rule.extend({
  params: ['orderItem', 'product'],
  functions: {
    _onValidate: function(done) {
      if (this.orderItem.price !== this.product.price) {
        this._invalidate(`The price for ${this.product.name} no longer reflects the current price in our system`);
      }
      done();
    }
  }
});

module.exports = OrderItemPriceValidityRule;
