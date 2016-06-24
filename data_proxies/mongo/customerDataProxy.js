var MongoDataProxy = require('./mongoDataProxy');

var CustomerDataProxy = function() {
  MongoDataProxy.call(this, "customers");
};

CustomerDataProxy.prototype = new MongoDataProxy();

module.exports = CustomerDataProxy;
