var HttpDataProxy = require('./httpDataProxy');

var CustomerDataProxy = function() {
  HttpDataProxy.call(this, 'customers');
};

CustomerDataProxy.prototype = new HttpDataProxy();

module.exports = CustomerDataProxy;
