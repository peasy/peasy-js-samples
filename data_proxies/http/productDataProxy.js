var HttpDataProxy = require('./httpDataProxy');
var axios = require('axios');

var ProductDataProxy = function() {
  HttpDataProxy.call(this, 'products');
};

ProductDataProxy.prototype = new HttpDataProxy();

ProductDataProxy.prototype.getByCategory = function(categoryId, done) {
  this._handleGetListByIdFrom(axios.get(`${this._url}?categoryid=${categoryId}`), done);
};

module.exports = ProductDataProxy;
