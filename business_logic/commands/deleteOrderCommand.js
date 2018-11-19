var Command = require('peasy-js').Command;
var Rule = require('peasy-js').Rule;
var CanShipOrderItemRule = require('../rules/canShipOrderItemRule');
var CanDeleteProductRule = require('../rules/canDeleteProductRule');

var DeleteOrderCommand = Command.extend({
  params: ['orderId', 'orderDataProxy', 'orderItemService', 'eventPublisher'],
  functions: {
    _getRules: function(orderId, orderDataProxy, orderItemService, eventPublisher, context, done) {
      var orderItemService = this.orderItemService;
      orderItemService.getByOrderCommand(this.orderId).execute(function(err, result) {
        if (err) { return done(err); }
        context.currentOrderItems = result.value;
        var commands = result.value.map(i => {
          return orderItemService.destroyCommand(i.id);
        });
        Rule.getAllRulesFrom(commands, function(err, rules) {
          done(err, rules);
        })
      });
    },
    _onValidationSuccess: function(orderId, orderDataProxy, orderItemService, eventPublisher, context, done) {
      var currentOrderItems = context.currentOrderItems;
      var commands = currentOrderItems.map(i => { return this.orderItemService.destroyCommand(i.id); });
      var orderDataProxy = this.orderDataProxy;
      var orderId = this.orderId;
      var eventPublisher = this.eventPublisher || { publish: () => {} };
      Command.executeAll(commands, function(err, results) {
        if (err) { return done(err, results); }
        orderDataProxy.destroy(orderId, function(err, result) {
          eventPublisher.publish({
            type: 'destroy',
            data: { id: orderId }
          });
          done();
        });
      });
    }
  }
});

module.exports = DeleteOrderCommand;
