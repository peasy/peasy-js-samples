var MongoDataProxy = require('./mongoDataProxy');

var ProductDataProxy = function() {
  MongoDataProxy.call(this, "products");
};

ProductDataProxy.prototype = new MongoDataProxy();

module.exports = ProductDataProxy;
