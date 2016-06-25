var MongoDataProxy = require('./mongoDataProxy');

var ProductDataProxy = function() {
  ProductDataProxy.call(this, "products");
};

ProductDataProxy.prototype = new MongoDataProxy();

module.exports = ProductDataProxy;
