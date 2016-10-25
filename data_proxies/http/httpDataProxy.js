var axious = require('axios');

var HttpDataProxy = function(entity) {
  this._url = `/${entity}`;
};

HttpDataProxy.prototype.getAll = function(done) {
  axios.get(this._url)
       .then(response => done(null, response.data))
       .catch(done);
}

HttpDataProxy.prototype.getById = function(id, done) {
  axios.get(`${this._url}/${id}`)
       .then(response => done(null, response.data))
       .catch(done);
};

HttpDataProxy.prototype.insert = function(data, done) {
  axios.post(this._url, data)
       .then(response => done(null, response.data))
       .catch((err) => {
         if (err.response.status === 400) {
           console.log("400 occurred");
         }
         done(err);
       });
};

HttpDataProxy.prototype.update = function(data, done) {
  axios.put(`${this._url}/${id}`, data)
       .then(response => done(null, response.data))
       .catch((err) => {
         if (err.response.status === 400) {
           console.log("400 occurred");
         }
         done(err);
       });
};

HttpDataProxy.prototype.update = function(data, done) {
  axios.put(`${this._url}/${data.id}`, data)
       .then(response => done(null, response.data))
       .catch((err) => {
         if (err.response.status === 400) {
           console.log("400 occurred");
         }
         done(err);
       });
};

HttpDataProxy.prototype.destroy = function(id, done) {
  axios.delete(`${this._url}/${id}`)
       .then(response => done(null, response.data))
       .catch((err) => {
         if (err.response.status === 400) {
           console.log("400 occurred");
         }
         done(err);
       });
};

module.exports = HttpDataProxy;
