var HttpDataProxy = require('./httpDataProxy');
var axios = require('axios');

var OrderItemDataProxy = function() {
  HttpDataProxy.call(this, 'orderitems');
};

OrderItemDataProxy.prototype = new HttpDataProxy();

OrderItemDataProxy.prototype.getByOrder = function(orderId, done) {
  this._handleGetListByIdFrom(axios.get(`${this._url}?orderid=${orderId}`), done);
};

module.exports = OrderItemDataProxy;
