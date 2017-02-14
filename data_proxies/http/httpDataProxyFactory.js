var CategoryDataProxy = require('./categoryDataProxy');
var CustomerDataProxy = require('./customerDataProxy');
var ProductDataProxy = require('./productDataProxy');
var InventoryItemDataProxy = require('./inventoryItemDataProxy');
var OrderDataProxy = require('./orderDataProxy.js');
var OrderItemDataProxy = require('./orderItemDataProxy.js');

module.exports = {
  categoryDataProxy: new CategoryDataProxy(),
  customerDataProxy: new CustomerDataProxy(),
  productDataProxy: new ProductDataProxy(),
  inventoryItemDataProxy: new InventoryItemDataProxy(),
  orderDataProxy: new OrderDataProxy(),
  orderItemDataProxy: new OrderItemDataProxy()
};
