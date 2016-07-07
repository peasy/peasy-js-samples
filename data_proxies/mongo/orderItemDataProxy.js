var MongoDataProxy = require('./mongoDataProxy');

var OrderItemDataProxy = function() {
  MongoDataProxy.call(this, "orderItems");
};

OrderItemDataProxy.prototype = new MongoDataProxy();

OrderItemDataProxy.prototype.getByOrder = function(orderId, done) {
  var self = this;
  self._mongodb.connect(self.connectionString, function(err, db) {
    if (err) { done(err); }
    var collection = db.collection(self.collectionName);
    collection.find({orderId: orderId}).toArray(function(err, data) {
      data.forEach((item) => {
        item.id = item._id;
        delete item._id;
      });
      db.close();
      done(err, data);
    });
  });
};

module.exports = OrderItemDataProxy;
