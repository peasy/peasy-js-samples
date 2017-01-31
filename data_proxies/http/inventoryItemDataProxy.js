var HttpDataProxy = require('./httpDataProxy');
var axios = require('axios');

var InventoryItemDataProxy  = function() {
  HttpDataProxy.call(this, 'inventoryitems');
};

InventoryItemDataProxy.prototype = new HttpDataProxy();

InventoryItemDataProxy.prototype.getByProduct = function(productId, done) {
  this._handleGetListByIdFrom(axios.get(`${this._url}?productid=${productId}`), done);
};

module.exports = InventoryItemDataProxy;
