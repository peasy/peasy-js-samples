var MongoDataProxy = require('./mongoDataProxy');

var OrderItemDataProxy = function() {
  MongoDataProxy.call(this, "orderItems");
};

OrderItemDataProxy.prototype = new MongoDataProxy();

module.exports = OrderItemDataProxy;
