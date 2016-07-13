var InMemoryDataProxy = require('./inMemoryDataProxy');

var ProductDataProxy = function() {
  InMemoryDataProxy.call(this);
};

ProductDataProxy.prototype = new InMemoryDataProxy();

ProductDataProxy.prototype.getByCategory = function(categoryId, done) {
  var products = this._store.filter(function(product) {
    return product.categoryId === categoryId;
  });
  done(products);
};

module.exports = ProductDataProxy;
