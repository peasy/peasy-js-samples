var HttpDataProxy = require('./httpDataProxy');

var CategoryDataProxy  = function() {
  HttpDataProxy.call(this, 'categories');
};

CategoryDataProxy.prototype = new HttpDataProxy();

module.exports = CategoryDataProxy ;
