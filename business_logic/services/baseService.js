var BusinessService = require('peasy-js').BusinessService;
var FieldRequiredRule = require('../rules/fieldRequiredRule');
var utils = require('../shared/utils');
var _ = require('lodash');
var NotFoundError = require('../shared/notFoundError');

var BaseService = BusinessService.extend({
  params: ['dataProxy', 'eventPublisher'],
  functions: {
    _update: function(context, done) {
      var dataProxy = this.dataProxy;
      var eventPublisher = this.eventPublisher || { publish: () => {} };
      var data = this.data;
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
    _insert: function(context, done) {
      var dataProxy = this.dataProxy;
      var eventPublisher = this.eventPublisher || { publish: () => {} };
      dataProxy.insert(this.data, function(err, result) {
        if (err) { return done(err); }
        eventPublisher.publish({
          type: 'insert',
          data: result
        });
        done(null, result);
      });
    },
    _destroy: function(context, done) {
      var dataProxy = this.dataProxy;
      var eventPublisher = this.eventPublisher || { publish: () => {} };
      var id = this.id;
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
