var MongoDataProxy = require('./mongoDataProxy');
var objectId = require('mongodb').ObjectID;

var OrderDataProxy = function() {
  MongoDataProxy.call(this, "orders");
};

OrderDataProxy.prototype = new MongoDataProxy();

OrderDataProxy.prototype.getByCustomer = function(customerId, done) {
  var self = this;
  self._mongodb.connect(self.connectionString, function(err, db) {
    if (err) { done(err); }
    var collection = db.collection(self.collectionName);
    collection.find({customerId: customerId}).toArray(function(err, data) {
      data.forEach((item) => {
        item.id = item._id;
        delete item._id;
      });
      db.close();
      done(err, data);
    });
  });
};

OrderDataProxy.prototype.getByProduct = function(productId, done) {
  var self = this;
  self._mongodb.connect(self.connectionString, function(err, db) {
    if (err) { done(err); }
    var collection = db.collection(self.collectionName);
    var orderItemsCollection = db.collection("orderItems");
    orderItemsCollection.find({productId: productId}).toArray(function(err, data) {
      var orderIds = data.map((i) => new objectId(i.orderId));
      if (orderIds.length > 0) {
        collection.find({_id: { $in: orderIds }}).toArray(function(err, data) {
          if (data) {
            data.forEach((item) => {
              item.id = item._id;
              delete item._id;
            });
            db.close();
          }
          done(err, data);
        });
      }
      else {
        done(null, []);
      }
    });
  });
};

module.exports = OrderDataProxy;
