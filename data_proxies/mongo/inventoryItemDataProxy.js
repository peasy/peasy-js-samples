var MongoDataProxy = require('./mongoDataProxy');

var InventoryItemDataProxy = function() {
  MongoDataProxy.call(this, "inventoryItems");
};

InventoryItemDataProxy.prototype = new MongoDataProxy();

module.exports = InventoryItemDataProxy;
