var HttpDataProxy = require('./httpDataProxy');
var axios = require('axios');

var OrderDataProxy = function() {
  HttpDataProxy.call(this, 'orders');
};

OrderDataProxy.prototype = new HttpDataProxy();

OrderDataProxy.prototype.getByCustomer = function(customerId, done) {
  this.handleResponseFrom(axios.get(`${this._url}?customerid=${customerId}`), done);
};

OrderDataProxy.prototype.getByProduct = function(productId, done) {
  this.handleResponseFrom(axios.get(`${this._url}?productid=${productId}`), done);
};

module.exports = OrderDataProxy;
