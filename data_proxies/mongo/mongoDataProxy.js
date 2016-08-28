var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var MongoDataProxy = function(collectionName) {
  this.connectionString = 'mongodb://localhost:27017/orderEntry';
  this.collectionName = collectionName;
  this._mongodb = mongodb;
};

MongoDataProxy.prototype.getAll = function(done) {
  var self = this;
  self._mongodb.connect(self.connectionString, function(err, db) {
    if (err) { return done(err); }
    var collection = db.collection(self.collectionName);
    collection.find({}).toArray(function(err, data) {
      data.forEach((item) => {
        item.id = item._id;
        delete item._id;
      });
      db.close();
      done(err, data);
    });
  });
};

MongoDataProxy.prototype.getById = function(id, done) {
  var self = this;
  self._mongodb.connect(self.connectionString, function(err, db) {
    if (err) { return done(err); }
    var collection = db.collection(self.collectionName);
    try {
      var oId = new objectId(id);
    } catch(ex) {
    }
    collection.findOne({_id: oId}, function(err, data) {
      if (data) {
        data.id = data._id;
        delete data._id;
      }
      db.close();
      done(err, data);
    });
  });
};

MongoDataProxy.prototype.insert = function(data, done) {
  var self = this;
  self._mongodb.connect(self.connectionString, function(err, db) {
    if (err) { return done(err); }
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

MongoDataProxy.prototype.update = function(data, done) {
  var self = this;
  self._mongodb.connect(self.connectionString, function(err, db) {
    if (err) { return done(err); }
    var collection = db.collection(self.collectionName);
    collection.update({_id: objectId(data.id)}, data, function(err, result) {
      db.close();
      done(err, data);
    });
  });
};

MongoDataProxy.prototype.destroy = function(id, done) {
  var self = this;
  self._mongodb.connect(self.connectionString, function(err, db) {
    if (err) { return done(err); }
    var collection = db.collection(self.collectionName);
    collection.remove({_id: objectId(id)}, function(err, data) {
      db.close();
      done(err, data);
    });
  });
};

module.exports = MongoDataProxy;
