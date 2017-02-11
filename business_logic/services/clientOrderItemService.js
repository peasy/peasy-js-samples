var OrderItemService = require('./orderItemService');
var Command = require('peasy-js').Command;

class ClientOrderItemService extends OrderItemService {
  constructor(dataProxy, productDataProxy, inventoryItemService) {
    super(dataProxy, productDataProxy, inventoryItemService);
  }

  submitCommand(orderItemId) {
    return new SubmitCommand(orderItemId, this.dataProxy);
  }

  shipCommand(orderItemId) {
    return new ShipCommand(orderItemId, this.dataProxy);
  }
} 

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

class ShipCommand extends Command {
  constructor(orderItemId, dataProxy) {
    super();
    this.orderItemId = orderItemId;
    this.dataProxy = dataProxy;
  }

  _onValidationSuccess(context, done) {
    this.dataProxy.ship(this.orderItemId, function(err, result) {
      if (err) { return done(err); }
      done(null, result);
    });
  }
}

module.exports = ClientOrderItemService;