var InMemoryDataProxy = require('./inMemoryDataProxy');

var InventoryItemDataProxy = function() {
  InMemoryDataProxy.call(this);
};

InventoryItemDataProxy.prototype = new InMemoryDataProxy();

InventoryItemDataProxy.prototype.getByProduct = function(productId, done) {
  var items = this._store.filter(function(item) {
    return item.productId === productId;
  });
  done(items);
};

module.exports = InventoryItemDataProxy;
