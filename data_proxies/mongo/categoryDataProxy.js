var MongoDataProxy = require('./mongoDataProxy');

var CategoryDataProxy = function() {
  MongoDataProxy.call(this, "categories");
};

CategoryDataProxy.prototype = new MongoDataProxy();

module.exports = CategoryDataProxy;
