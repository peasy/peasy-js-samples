var axios = require('axios');
var ServiceException = require('../../node_modules/peasy-js').ServiceException;
var ConcurrencyError = require('../../business_logic/shared/concurrencyError');
var NotFoundError = require('../../business_logic/shared/notFoundError');

var HttpDataProxy = function(entity) {
  this._url = `/${entity}`;
};

HttpDataProxy.httpStatusCodes = {
  BAD_REQUEST: 400,
  CONFLICT: 409,
  NOT_FOUND: 404,
  NOT_IMPLEMENTED: 501
};

HttpDataProxy.prototype.getAll = function(done) {
  this._handleResponseFrom(axios.get(this._url), done)
};

HttpDataProxy.prototype.getById = function(id, done) {
  this._handleResponseFrom(axios.get(`${this._url}/${id}`), done);
};

HttpDataProxy.prototype.insert = function(data, done) {
  this._handleResponseFrom(axios.post(this._url, data), done);
};

HttpDataProxy.prototype.update = function(data, done) {
  this._handleResponseFrom(axios.put(`${this._url}/${data.id}`, data), done);
};

HttpDataProxy.prototype.destroy = function(id, done) {
  this._handleResponseFrom(axios.delete(`${this._url}/${id}`), done);
};

HttpDataProxy.prototype._handleResponseFrom = function(promise, done) {
  promise.then(response => done(null, response.data))
         .catch((err) => { debugger; done(this._getError(err)) });
}

HttpDataProxy.prototype._handleGetListByIdFrom = function(promise, done) {
  promise.then(response => {
    done(null, response.data);
  })
  .catch(err => {
    if (err.response.status === HttpDataProxy.httpStatusCodes.NOT_FOUND) {
      return done(null, []);
    }
    done(this._getError(err));
  });
}

HttpDataProxy.prototype._getError = function(err) {
  switch (err.response.status) {
    case HttpDataProxy.httpStatusCodes.BAD_REQUEST:
      var serviceException = new ServiceException(err.message);
      if (Array.isArray(err.response.data)) {
        serviceException.errors = err.response.data;
      }
      return serviceException;

    case HttpDataProxy.httpStatusCodes.CONFLICT:
      return new ConcurrencyError(err.message);

    case HttpDataProxy.httpStatusCodes.NOT_FOUND:
      return new NotFoundError(err.message);

    default:
      return err;
  }
}

module.exports = HttpDataProxy;
