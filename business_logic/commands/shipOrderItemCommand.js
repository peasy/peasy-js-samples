var Command = require('peasy-js').Command;
var CanShipOrderItemRule = require('../rules/canShipOrderItemRule');

var ShipOrderItemCommand = Command.extend({
  params: ['orderItemId', 'orderItemDataProxy', 'inventoryItemService'],
  functions: {
    _getRules: function(context, done) {
      this.orderItemDataProxy.getById(this.orderItemId, function(err, orderItem) {
        if (err) { return done(err); }
        context.currentOrderItem = orderItem;
        done(null, new CanShipOrderItemRule(orderItem));
      });
    },
    _onValidationSuccess: function(context, done) {
      var currentOrderItem = context.currentOrderItem;
      var inventoryItemService = this.inventoryItemService;
      var orderItemDataProxy = this.orderItemDataProxy;

      inventoryItemService.getByProductCommand(currentOrderItem.productId).execute(function(err, result) {
        if (err) { return done(err); }
        var inventoryItem = result.value;
        if (inventoryItem.quantityOnHand - currentOrderItem.quantity >= 0) {
          currentOrderItem.status = "SHIPPED";
          currentOrderItem.shippedOn = new Date();
          inventoryItem.quantityOnHand -= currentOrderItem.quantity;
          inventoryItemService.updateCommand(inventoryItem).execute(function(err, result) {
            if (err) { return done(err); }
            saveOrderItem(currentOrderItem, done);
          });
        } else {
          currentOrderItem.status = "BACKORDERED";
          currentOrderItem.backorderedOn = new Date();
          saveOrderItem(currentOrderItem, done);
        }
      });

      function saveOrderItem(item, done) {
        orderItemDataProxy.update(item, function(err, orderItem) {
          if (err) { return done(err); }
          done(null, orderItem);
        });
      }
    }
  }
});

module.exports = ShipOrderItemCommand;
