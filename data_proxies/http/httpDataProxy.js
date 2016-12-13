var axios = require('axios');
var ServiceException = require('../../node_modules/peasy-js').ServiceException;
var ConcurrencyError = require('../../business_logic/shared/concurrencyError');
var NotFoundError = require('../../business_logic/shared/notFoundError');

var HttpDataProxy = function(entity) {
  this._url = `/${entity}`;
};

HttpDataProxy.prototype.getAll = function(done) {
  handleResponseFrom(axios.get(this._url), done)
};

HttpDataProxy.prototype.getById = function(id, done) {
  handleResponseFrom(axios.get(`${this._url}/${id}`), done);
};

HttpDataProxy.prototype.insert = function(data, done) {
  handleResponseFrom(axios.post(this._url, data), done);
};

HttpDataProxy.prototype.update = function(data, done) {
  handleResponseFrom(axios.put(`${this._url}/${data.id}`, data), done);
};

HttpDataProxy.prototype.destroy = function(id, done) {
  handleResponseFrom(axios.delete(`${this._url}/${id}`), done);
};

function handleResponseFrom(promise, done) {
  promise.then(response => done(null, response.data))
         .catch((err) => done(getError(err)));
}

var httpStatusCodes = {
  badRequest: 400,
  conflict: 409,
  notFound: 404,
  notImplemented: 501
}

function getError(err) {
  switch (err.response.status) {
    case httpStatusCodes.badRequest:
      var serviceException = new ServiceException(err.message);
      if (Array.isArray(err.response.data)) {
        serviceException.errors = err.response.data;
      }
      return serviceException;

    case httpStatusCodes.conflict:
      return new ConcurrencyError(err.message);

    case httpStatusCodes.notFound:
      return new NotFoundError(err.message);

    default:
      return err;
  }
}

module.exports = HttpDataProxy;
