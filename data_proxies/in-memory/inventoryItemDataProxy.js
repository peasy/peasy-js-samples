var InMemoryDataProxy = require('./inMemoryDataProxy');
var ConcurrencyError = require('./../../business_logic/shared/concurrencyError');
var _ = require('lodash');

var InventoryItemDataProxy = function(defaults) {
  InMemoryDataProxy.call(this, defaults);
};

InventoryItemDataProxy.prototype = new InMemoryDataProxy();

InventoryItemDataProxy.prototype.update = function(data, done) {
  var existing = this._findBy(data.id);
  if (existing.version !== data.version) {
    return done(new ConcurrencyError("This item has been modified, please try again with new version"));
  }
  data.version++;
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
