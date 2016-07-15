var InMemoryDataProxy = require('./inMemoryDataProxy');

var OrderItemDataProxy = function(defaults) {
  InMemoryDataProxy.call(this, defaults);
};

OrderItemDataProxy.prototype = new InMemoryDataProxy();

OrderItemDataProxy.prototype.getByOrder = function(orderId, done) {
  var items = this._store.filter(function(item) {
    return item.orderId == orderId;
  });
  done(null, items);
};

module.exports = OrderItemDataProxy;
