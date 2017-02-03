var _ = require('lodash');

var InMemoryDataProxy = function(data) {
  this._store = data || [];
};

InMemoryDataProxy.prototype.getById = function(id, done) {
  var data = this._findBy(id);
  if (data) {
    data = Object.assign({}, data);
  }
  done(null, data);
};

InMemoryDataProxy.prototype.getAll = function(done) {
  var all = this._store.map(function(item) {
    return Object.assign({}, item);
  });
  done(null, all);
};

InMemoryDataProxy.prototype.insert = function(data, done) {
  data.id = this._store.length + 1;
  this._store.push(Object.assign({}, data));
  done(null, data);
};

InMemoryDataProxy.prototype.update = function(data, done) {
  var existing = this._findBy(data.id);
  _.merge(existing, data);
  done(null, Object.assign({}, existing));
};

InMemoryDataProxy.prototype.destroy = function(id, done) {
  var data = this._findBy(id);
  var index = this._store.indexOf(data);
  if (index > -1) {
    this._store.splice(index, 1);
  }
  done(null);
};

InMemoryDataProxy.prototype._findBy = function(id) {
  var data = this._store.filter((function(p) {
    return p.id === id;
  }))[0];
  return data;
};

if (module) {
  module.exports = InMemoryDataProxy;
}
