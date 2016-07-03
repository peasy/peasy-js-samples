var BusinessService = require('peasy-js').BusinessService;
var FieldRequiredRule = require('../rules/fieldRequiredRule');
var utils = require('../shared/utils');
var _ = require('lodash');
var NotFoundError = require('../shared/notFoundError');

var BaseService = BusinessService.extend({
  functions: {
    _update: function(context, done) {
      var dataProxy = this.dataProxy;
      var data = this.data;
      dataProxy.getById(data.id, function(err, result) {
        if (err) { return done(err); }
        if (!result) { return done(new NotFoundError(`item ${data.id} not found`)); }
        var entity = _.merge(result, data);
        dataProxy.update(entity, function(err, result) {
          if (err) { return done(err); }
          done(null, result);
        });
      });
    }
  }
}).service;

module.exports = BaseService;
