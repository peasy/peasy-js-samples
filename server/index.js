var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var utils = require('./utils');
var InMemoryDataProxy = require('../data_proxies/in-memory/InMemoryDataProxy.js');
var CustomerDataProxy = require('../data_proxies/mongo/customerDataProxy');
var CustomerService = require('../business_logic/services/customerService');
var CategoryDataProxy = require('../data_proxies/mongo/categoryDataProxy');
var CategoryService = require('../business_logic/services/categoryService');
var ProductDataProxy = require('../data_proxies/mongo/productDataProxy');
var ProductService = require('../business_logic/services/productService');
var InventoryItemDataProxy = require('../data_proxies/mongo/inventoryItemDataProxy');
var InventoryItemService = require('../business_logic/services/inventoryItemService');
var OrderDataProxy = require('../data_proxies/mongo/orderDataProxy.js');
var OrderService = require('../business_logic/services/orderService.js');
var OrderItemDataProxy = require('../data_proxies/mongo/orderItemDataProxy.js');
var OrderItemService = require('../business_logic/services/orderItemService.js');

// MIDDLEWARE
app.use(function(req, res, next) {
  for (var key in req.query) {
    req.query[key.toLowerCase()] = req.query[key];
  }
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// ROUTES AND CONTROLLERS
utils.createController('/customers', app, new CustomerService(new CustomerDataProxy()));
utils.createController('/categories', app, new CategoryService(new CategoryDataProxy()));
utils.addGetRouteHandler(app, '/products', function(request) {
  var service = new ProductService(new ProductDataProxy());
  var command = service.getAllCommand();
  if (request.query.categoryid) {
    command = service.getByCategoryCommand(request.query.categoryid);
  }
  return command;
});
utils.createController('/products', app, new ProductService(new ProductDataProxy()));
utils.addGetRouteHandler(app, '/inventoryItems', function(request) {
  var service = new InventoryItemService(new InventoryItemDataProxy());
  var command = service.getAllCommand();
  if (request.query.productId) {
    command = service.getByProductCommand(request.query.productId);
  }
  return command;
});
utils.createController('/inventoryItems', app, new InventoryItemService(new InventoryItemDataProxy()));
utils.addGetRouteHandler(app, '/orders', function(request) {
  var service = new OrderService(new OrderDataProxy());
  var command = service.getAllCommand();
  if (request.query.customerId) {
    return service.getByCustomerCommand(request.query.customerId);
  }
  if (request.query.productId) {
    return service.getByProductCommand(request.query.productId);
  }
  return command;
});
utils.createController('/orders', app, new OrderService(new OrderDataProxy()));
function newOrderItemService() {
  return new OrderItemService(
    new OrderItemDataProxy(),
    new ProductService(new ProductDataProxy()),
    new InventoryItemService(new InventoryItemDataProxy())
  );
}
utils.addPostRouteHandler(app, '/orderItems/:id/submit', function(request) {
  var service = newOrderItemService();
  return service.submitCommand(request.params.id);
});
utils.addPostRouteHandler(app, '/orderItems/:id/ship', function(request) {
  var service = newOrderItemService();
  return service.shipCommand(request.params.id);
});
utils.createController('/orderItems', app, newOrderItemService());


//app.get('/', function(req, res) {
  ////res.send('hello world');
  //res.json({'hi':'world'});
//});

var server = app.listen(3000, function() {
  console.log("server running ...");
});
