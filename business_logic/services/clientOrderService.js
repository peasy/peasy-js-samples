var Command = require('peasy-js').Command;
var OrderService = require('../services/orderService');

class ClientOrderService extends OrderService {
  constructor(dataProxy, orderItemService) {
    super(dataProxy, orderItemService);
  }

  destroyCommand(orderId) {
    return new DestroyCommand(orderId, this.dataProxy);
  }
}

class DestroyCommand extends Command {
  constructor(orderId, dataProxy) {
    super();
    this.orderId = orderId;
    this.dataProxy = dataProxy;
  }

  _onValidationSuccess(context, done) {
    this.dataProxy.destroy(this.orderId, done);
  }
}

module.exports = ClientOrderService;