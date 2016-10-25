var HttpDataProxy = require('./httpDataProxy');

var OrderDataProxy = function() {
  HttpDataProxy.call(this, 'orders');
};

OrderDataProxy.prototype = new HttpDataProxy();

OrderDataProxy.prototype.getByCustomer = function(customerId, done) {
};

OrderDataProxy.prototype.getByProduct = function(productId, done) {
};

module.exports = OrderDataProxy;
