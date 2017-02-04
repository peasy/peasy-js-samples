var ProductService = require('./productService');
var CreateProductCommand = require('../commands/createProductCommand');
var DeleteProductCommand = require('../commands/deleteProductCommand');

class CreateProductClientCommand extends CreateProductCommand {
  constructor(product, productDataProxy, inventoryItemService) {
    super(product, productDataProxy, inventoryItemService);
  }

  _onValidationSuccess(context, done) {
    this.productDataProxy.insert(this.product, function(err, result) {
      if (err) { return done(err); }
      done(null, result);
    });
  }
}

class DeleteProductClientCommand extends DeleteProductCommand {
  constructor(productId, dataProxy, orderService, inventoryItemService) {
    super(productId, dataProxy, orderService, inventoryItemService);
  }

  _onValidationSuccess(context, done) {
    this.productDataProxy.destroy(this.productId, function(err, result) {
      if (err) { return done(err); }
      done(null, result);
    });
  }
}

class ClientProductService extends ProductService {
  constructor(dataProxy, orderService, inventoryItemService) {
    super(dataProxy, orderService, inventoryItemService);
  }

  insertCommand(product) {
    return new CreateProductClientCommand(product, this.dataProxy, this.inventoryItemService);
  }
  
  destroyCommand(productId) {
    return new DeleteProductClientCommand(productId, this.dataProxy, this.orderService, this.inventoryItemService);
  }
} 

// ES5 Implementation
// var ClientCreateProductCommand = function(product, productDataProxy, inventoryItemService) {
//   CreateProductCommand.call(this, product, productDataProxy, inventoryItemService);
// }
// ClientCreateProductCommand.prototype = new CreateProductCommand();
// ClientCreateProductCommand.prototype._onValidationSuccess = function(context, done) {
//   debugger;
//   this.productDataProxy.insert(this.product, function(err, result) {
//     if (err) { return done(err); }
//     done(null, result);
//   });
// }

// var ClientProductService = function(dataProxy, orderService, inventoryItemService) {
//   ProductService.call(this, dataProxy, orderService, inventoryItemService);
// }

// ClientProductService.prototype = new ProductService();
// ClientProductService.prototype.insertCommand = function(product) {
//   return new ClientCreateProductCommand(product, this.dataProxy, this.inventoryItemService);
// };


module.exports = ClientProductService;