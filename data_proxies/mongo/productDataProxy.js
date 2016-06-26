var objectId = require('mongodb').ObjectID;
var MongoDataProxy = require('./mongoDataProxy');

var ProductDataProxy = function() {
  MongoDataProxy.call(this, "products");
};

ProductDataProxy.prototype = new MongoDataProxy();

ProductDataProxy.prototype.getByCategory = function(categoryId, done) {
  var self = this;
  self._mongodb.connect(self.connectionString, function(err, db) {
    if (err) { done(err); }
    var collection = db.collection(self.collectionName);
    collection.find({categoryId: categoryId}).toArray(function(err, data) {
      data.forEach((item) => {
        item.id = item._id;
        delete item._id;
      });
      db.close();
      done(err, data);
    });
  });
};

module.exports = ProductDataProxy;
