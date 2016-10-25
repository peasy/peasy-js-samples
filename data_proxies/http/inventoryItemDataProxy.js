var HttpDataProxy = require('./httpDataProxy');

var InventoryItemDataProxy  = function() {
  HttpDataProxy.call(this, 'inventoryitems');
};

InventoryItemDataProxy.prototype.getByProduct = function(productId, done) {
};

InventoryItemDataProxy.prototype = new HttpDataProxy();

module.exports = InventoryItemDataProxy;
