var HttpDataProxy = require('./httpDataProxy');

var OrderItemDataProxy = function() {
  HttpDataProxy.call(this, 'orderitems');
};

OrderItemDataProxy.prototype = new HttpDataProxy();

OrderItemDataProxy.prototype.getByOrder = function(orderId, done) {
};

module.exports = OrderItemDataProxy;
