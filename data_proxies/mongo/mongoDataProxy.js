var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var MongoDataProxy = function(collectionName) {
  this.connectionString = 'mongodb://localhost:27017/orderEntry';
  this.collectionName = collectionName;
};

MongoDataProxy.prototype.getAll = function(done) {
  var self = this;
  mongodb.connect(self.connectionString, function(err, db) {
    if (err) { done(err); }
    var collection = db.collection(self.collectionName);
    collection.find({}).toArray(function(err, data) {
      db.close();
      done(err, data);
    });
  });
};

MongoDataProxy.prototype.getById = function(id, done) {
  var self = this;
  mongodb.connect(self.connectionString, function(err, db) {
    if (err) { done(err); }
    var collection = db.collection(self.collectionName);
    var oId = new objectId(id);
    collection.findOne({_id: oId}, function(err, data) {
      db.close();
      done(err, data);
    });
  });
};

MongoDataProxy.prototype.insert = function(data, done) {
  var self = this;
  mongodb.connect(self.connectionString, function(err, db) {
    if (err) { done(err); }
    var collection = db.collection(self.collectionName);
    collection.insert(data, function(err, data) {
      db.close();
      done(err, data.ops[0]);
    });
  });
};

MongoDataProxy.prototype.update = function(data, done) {
  var self = this;
  mongodb.connect(self.connectionString, function(err, db) {
    if (err) { done(err); }
    var collection = db.collection(self.collectionName);
    collection.update({_id: objectId(data._id)}, data, function(err, result) {
      db.close();
      done(err, data);
    });
  });
};

MongoDataProxy.prototype.destroy = function(id, done) {
  var self = this;
  mongodb.connect(self.connectionString, function(err, db) {
    if (err) { done(err); }
    var collection = db.collection(self.collectionName);
    collection.remove({_id: objectId(id)}, function(err, data) {
      db.close();
      done(err, data);
    });
  });
};

module.exports = MongoDataProxy;
