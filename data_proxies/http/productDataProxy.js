var HttpDataProxy = require('./httpDataProxy');

var ProductDataProxy = function() {
  HttpDataProxy.call(this, 'products');
};

ProductDataProxy.prototype = new HttpDataProxy();

ProductDataProxy.prototype.getByCategory = function(categoryId, done) {
};

module.exports = ProductDataProxy;
