var Command = require('peasy-js').Command;
var CanShipOrderItemRule = require('../rules/canShipOrderItemRule');

var ShipOrderItemCommand = Command.extend({
  params: ['orderItemId', 'orderItemService', 'inventoryItemService'],
  functions: {
    _getRules: function(context, done) {
      this.orderItemService.getByIdCommand(this.orderItemId).execute(function(err, result) {
        if (err) { return done(err) ;}
        context.currentOrderItem = result.value;
        done(null, new CanShipOrderItemRule(result.value));
      });
    },
    _onValidationSuccess: function(context, done) {
      var currentOrderItem = context.currentOrderItem;
      var inventoryItemService = this.inventoryItemService;
      var orderItemService = this.orderItemService;

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
        }
        saveOrderItem(currentOrderItem, done);
      });

      function saveOrderItem(item, done) {
        orderItemService.updateCommand(item).execute(function(err, result) {
          if (err) { return done(err); }
          done(null, result.value);
        });
      }
    }
  }
});

