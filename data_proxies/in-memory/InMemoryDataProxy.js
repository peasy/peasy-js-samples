var InMemoryDataProxy = function() {
  this._store = [];
};

InMemoryDataProxy.prototype.getById = function(id, done) {
  var data = this._findBy(id);
  done(null, Object.assign({}, data));
}

InMemoryDataProxy.prototype.getAll = function(done) {
  var all = this._store.map(function(item) {
    return Object.assign({}, item);
  });
  done(null, all);
}

InMemoryDataProxy.prototype.insert = function(data, done) {
  data.id = this._store.length + 1;
  this._store.push(Object.assign({}, data));
  done(null, data);
}

InMemoryDataProxy.prototype.update = function(data, done) {
  var person = this._findBy(data.id);
  person.name = data.name;
  done(null, data);
}

InMemoryDataProxy.prototype.destroy = function(id, done) {
  var data = this._findBy(id);
  var index = this._store.indexOf(data);
  this._store.splice(index, 1);
  done(null);
}

InMemoryDataProxy.prototype._findBy = function(id) {
  var data = this._store.filter((function(p) {
    return p.id === id;
  }))[0];
  return data;
}
