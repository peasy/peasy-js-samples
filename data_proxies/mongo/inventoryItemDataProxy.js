var MongoDataProxy = require('./mongoDataProxy');
var objectId = require('mongodb').ObjectID;
var ConcurrencyError = require('../../business_logic/shared/concurrencyError');

var InventoryItemDataProxy = function() {
  MongoDataProxy.call(this, "inventoryItems");
};

InventoryItemDataProxy.prototype = new MongoDataProxy();

InventoryItemDataProxy.prototype.insert = function(data, done) {
  var self = this;
  self._mongodb.connect(self.connectionString, function(err, db) {
    if (err) { done(err); }
    var collection = db.collection(self.collectionName);
    collection.insert(data, function(err, result) {
      var entity = result.ops[0];
      entity.id = entity._id;
      delete entity._id;
      db.close();
      done(err, entity);
    });
  });
};

InventoryItemDataProxy.prototype.update = function(data, done) {
  var self = this;
  self._mongodb.connect(self.connectionString, function(err, db) {
    if (err) { done(err); }
    var collection = db.collection(self.collectionName);
    var currentVersion = data.version;
    data.version++;
    var result = collection.update({ '_id' : objectId(data.id), 'version' : currentVersion }, data, function(err, result) {
      db.close();
      if (result.result.nModified !== 1) {
        return done(new ConcurrencyError("This item has been modified, please try again with new version"));
      }
      done(err, data);
    });
  });
};

InventoryItemDataProxy.prototype.getByProduct = function(productId, done) {
  var self = this;
  self._mongodb.connect(self.connectionString, function(err, db) {
    if (err) { done(err); }
    var collection = db.collection(self.collectionName);
    collection.findOne({productId: productId}, function(err, data) {
      if (data) {
        data.id = data._id;
        delete data._id;
      }
      db.close();
      done(err, data);
    });
  });
};

module.exports = InventoryItemDataProxy;
