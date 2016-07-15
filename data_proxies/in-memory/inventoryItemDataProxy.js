var InMemoryDataProxy = require('./inMemoryDataProxy');
var _ = require('lodash');

var InventoryItemDataProxy = function(defaults) {
  InMemoryDataProxy.call(this, defaults);
};

InventoryItemDataProxy.prototype = new InMemoryDataProxy();

InventoryItemDataProxy.prototype.update = function(data, done) {
  var existing = this._findBy(data.id);
  existing.version++;
  _.merge(existing, data);
  done(null, Object.assign({}, existing));
};

InventoryItemDataProxy.prototype.getByProduct = function(productId, done) {
  var items = this._store.filter(function(item) {
    return item.productId == productId;
  })[0];
  done(null, items || []);
};

module.exports = InventoryItemDataProxy;
