var InMemoryDataProxy = require('./inMemoryDataProxy');

var OrderItemDataProxy = function() {
  InMemoryDataProxy.call(this);
};

OrderItemDataProxy.prototype = new InMemoryDataProxy();

OrderItemDataProxy.prototype.getByOrder = function(orderId, done) {
  var items = this._store.filter(function(item) {
    return item.orderId === orderId;
  });
  done(items);
};

module.exports = OrderItemDataProxy;
