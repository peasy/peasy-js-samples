var HttpDataProxy = require('./httpDataProxy');
var axios = require('axios');

var InventoryItemDataProxy  = function() {
  HttpDataProxy.call(this, 'inventoryitems');
};

InventoryItemDataProxy.prototype.getByProduct = function(productId, done) {
  this._handleGetListByIdFrom(axios.get(`${this._url}?productid=${productId}`), done);
};

InventoryItemDataProxy.prototype = new HttpDataProxy();

module.exports = InventoryItemDataProxy;
