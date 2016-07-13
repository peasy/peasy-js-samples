var InMemoryDataProxy = require('./inMemoryDataProxy');

var OrderDataProxy = function(orderItemDataProxy) {
  this._orderItemDataProxy = orderItemDataProxy;
  InMemoryDataProxy.call(this);
};

OrderDataProxy.prototype = new InMemoryDataProxy();

OrderDataProxy.prototype.getByCustomer = function(customerId, done) {
  var orders = this._store.filter(function(order) {
    return order.customerId === customerId;
  });
  done(orders);
};

OrderDataProxy.prototype.getByProduct = function(productId, done) {
  var self = this;
  self._orderItemDataProxy.getAll(function(err, items) {
    var orderIds = items.filter(function(item) {
      return item.productId === productId;
    }).map(function(item) {
      return item.orderId;
    });
    var orders = this._store.filter(function(order) {
      return orderIds.indexOf(order._id) > -1;
    });
    done(orders);
  });
};

module.exports = OrderDataProxy;
