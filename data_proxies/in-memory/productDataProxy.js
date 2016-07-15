var InMemoryDataProxy = require('./inMemoryDataProxy');

var ProductDataProxy = function(defaults) {
  InMemoryDataProxy.call(this, defaults);
};

ProductDataProxy.prototype = new InMemoryDataProxy();

ProductDataProxy.prototype.getByCategory = function(categoryId, done) {
  var products = this._store.filter(function(product) {
    return product.categoryId == categoryId;
  });
  done(null, products);
};

module.exports = ProductDataProxy;
