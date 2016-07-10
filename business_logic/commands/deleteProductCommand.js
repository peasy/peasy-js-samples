var Command = require('peasy-js').Command;
var CanShipOrderItemRule = require('../rules/canShipOrderItemRule');
var CanDeleteProductRule = require('../rules/canDeleteProductRule');

var DeleteProductCommand = Command.extend({
  params: ['productId', 'productDataProxy', 'orderService', 'inventoryItemService'],
  functions: {
    _getRules: function(context, done) {
      done(null, new CanDeleteProductRule(this.productId, this.orderService));
    },
    _onValidationSuccess: function(context, done) {
      var inventoryItemService = this.inventoryItemService;
      var productDataProxy = this.productDataProxy;
      var productId = this.productId;
      inventoryItemService.getByProductCommand(this.productId).execute(function(err, result) {
        if (err) { return done(err); }
        inventoryItemService.destroyCommand(result.value.id).execute(function(err, result) {
          if (err) { return done(err); }
          productDataProxy.destroy(productId, function(err, result) {
            done();
          });
        });
      });
    }
  }
});

module.exports = DeleteProductCommand;
