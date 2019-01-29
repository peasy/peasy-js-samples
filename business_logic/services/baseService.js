var BusinessService = require('peasy-js').BusinessService;
var NotFoundError = require('../shared/notFoundError');
var _ = require('lodash');

var BaseService = BusinessService.extend({
  params: ['dataProxy', 'eventPublisher'],
  functions: {
    _update: function(data, context, done) {
      var dataProxy = this.dataProxy;
      var eventPublisher = this.eventPublisher || { publish: () => {} };
      dataProxy.getById(data.id, function(err, result) {
        if (err) { return done(err); }
        if (!result) { return done(new NotFoundError(`item ${data.id} not found`)); }
        var entity = _.merge(result, data);
        dataProxy.update(entity, function(err, result) {
          if (err) { return done(err); }
          eventPublisher.publish({
            type: 'update',
            data: result
          });
          done(null, result);
        });
      });
    },
    _insert: function(data, context, done) {
      var dataProxy = this.dataProxy;
      var eventPublisher = this.eventPublisher || { publish: () => {} };
      dataProxy.insert(data, function(err, result) {
        if (err) { return done(err); }
        eventPublisher.publish({
          type: 'insert',
          data: result
        });
        done(null, result);
      });
    },
    _destroy: function(id, context, done) {
      var dataProxy = this.dataProxy;
      var eventPublisher = this.eventPublisher || { publish: () => {} };
      dataProxy.destroy(id, function(err, result) {
        if (err) { return done(err); }
        eventPublisher.publish({
          type: 'destroy',
          data: { id: id }
        });
        done(null, result);
      });
    }
  }
}).service;

module.exports = BaseService;
