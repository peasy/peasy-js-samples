var InMemoryDataProxy = require('./inMemoryDataProxy');
var ProductDataProxy = require('./productDataProxy');
var InventoryItemDataProxy = require('./inventoryItemDataProxy');
var OrderDataProxy = require('./orderDataProxy');
var OrderItemDataProxy = require('./orderItemDataProxy');

var orderItemDataProxy = new OrderItemDataProxy([{"quantity": 2, "amount": 5000, "price": 2250, "productId": 1, "orderId": 1, "status": "PENDING", "id": 1 }]);

module.exports = {
  categoryDataProxy: new InMemoryDataProxy([{id: 1, name: "Musical Equipment"}, {id: 2, name: "Art Supplies"}]),
  customerDataProxy: new InMemoryDataProxy([{id: 1, name: "Jimi Hendrix"}]),
  productDataProxy: new ProductDataProxy([{id: 1, name: "PRS Hollow II", categoryId: 1, price: 2250}, {id: 2, name: "Pastelles", categoryId: 2, price: 10.5}]),
  inventoryItemDataProxy: new InventoryItemDataProxy([{id: 1, productId: 1, quantityOnHand: 1, version: 1}, {id: 1, productId: 2, quantityOnHand: 5, version: 1}]),  
  orderDataProxy: new OrderDataProxy(orderItemDataProxy, [{id: 1, customerId: 1}]),
  orderItemDataProxy: orderItemDataProxy
};
