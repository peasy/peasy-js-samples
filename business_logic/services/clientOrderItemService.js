var OrderItemService = require('./orderItemService');
var CreateOrderItemCommand = require('../commands/createProductCommand');
var DeleteOrderItemCommand = require('../commands/deleteProductCommand');
var Command = require('peasy-js').Command;

// class CreateOrderItemClientCommand extends CreateProductCommand {
//   constructor(orderItem, productDataProxy, inventoryItemService) {
//     super(orderItem, productDataProxy, inventoryItemService);
//   }

//   _onValidationSuccess(context, done) {
//     this.orderItemDataProxy.insert(this.product, function(err, result) {
//       if (err) { return done(err); }
//       done(null, result);
//     });
//   }
// }

// class DeleteOrderItemClientCommand extends DeleteProductCommand {
//   constructor(orderItemId, dataProxy, orderService, inventoryItemService) {
//     super(orderItemId, dataProxy, orderService, inventoryItemService);
//   }

//   _onValidationSuccess(context, done) {
//     this.orderItemDataProxy.destroy(this.productId, function(err, result) {
//       if (err) { return done(err); }
//       done(null, result);
//     });
//   }
// }

class SubmitCommand extends Command {
  constructor(orderItemId, dataProxy) {
    super();
    this.orderItemId = orderItemId;
    this.dataProxy = dataProxy;
  }

  _onValidationSuccess(context, done) {
    this.dataProxy.submit(this.orderItemId, function(err, result) {
      if (err) { return done(err); }
      done(null, result);
    });
  }
}

class ClientOrderItemService extends OrderItemService {
  constructor(dataProxy, productDataProxy, inventoryItemService) {
    super(dataProxy, productDataProxy, inventoryItemService);
  }

  submitCommand(orderItemId) {
    return new SubmitCommand(orderItemId, this.dataProxy);
  }
} 

module.exports = ClientOrderItemService;