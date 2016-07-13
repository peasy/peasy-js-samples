var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var utils = require('./utils');
var CustomerService = require('../business_logic/services/customerService');
var CategoryService = require('../business_logic/services/categoryService');
var ProductService = require('../business_logic/services/productService');
var InventoryItemService = require('../business_logic/services/inventoryItemService');
var OrderService = require('../business_logic/services/orderService');
var OrderItemService = require('../business_logic/services/orderItemService');

//MONGO DATA PROXIES
//var CategoryDataProxy = require('../data_proxies/mongo/categoryDataProxy');
//var CustomerDataProxy = require('../data_proxies/mongo/customerDataProxy');
//var ProductDataProxy = require('../data_proxies/mongo/productDataProxy');
//var InventoryItemDataProxy = require('../data_proxies/mongo/inventoryItemDataProxy');
//var OrderDataProxy = require('../data_proxies/mongo/orderDataProxy.js');
//var OrderItemDataProxy = require('../data_proxies/mongo/orderItemDataProxy.js');

//IN-MEMORY DATA PROXIES
var CategoryDataProxy = require('../data_proxies/in-memory/inMemoryDataProxy');
var CustomerDataProxy = require('../data_proxies/in-memory/inMemoryDataProxy');
var ProductDataProxy = require('../data_proxies/in-memory/productDataProxy');
var InventoryItemDataProxy = require('../data_proxies/in-memory/inventoryItemDataProxy');
var OrderDataProxy = require('../data_proxies/in-memory/orderDataProxy.js');
var OrderItemDataProxy = require('../data_proxies/in-memory/orderItemDataProxy.js');

var categoryDataProxy = new CategoryDataProxy();
var customerDataProxy = new CustomerDataProxy();
var productDataProxy = new ProductDataProxy();
var inventoryItemDataProxy = new InventoryItemService();
var orderItemDataProxy = new OrderItemDataProxy();
var orderDataProxy = new OrderDataProxy(orderItemDataProxy);

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

var orderItemService = new OrderItemService(orderItemDataProxy);
var orderService = new OrderService(orderDataProxy, orderItemService);
var customerService = new CustomerService(customerDataProxy, orderService);
var inventoryItemService = new InventoryItemService(inventoryItemDataProxy);
var productService = new ProductService(productDataProxy, orderService, inventoryItemService);
var categoryService = new CategoryService(categoryDataProxy, productService);

// ROUTES AND CONTROLLERS
utils.createController('/customers', app, customerService);

utils.createController('/categories', app, categoryService);

utils.addGetRouteHandler(app, '/products', function(request) {
  var service = productService;
  var command = service.getAllCommand();
  if (request.query.categoryid) {
    command = service.getByCategoryCommand(request.query.categoryid);
  }
  return command;
});
utils.createController('/products', app, productService);

utils.addGetRouteHandler(app, '/inventoryItems', function(request) {
  var service = inventoryItemService;
  var command = service.getAllCommand();
  if (request.query.productId) {
    command = service.getByProductCommand(request.query.productId);
  }
  return command;
});
utils.createController('/inventoryItems', app, inventoryItemService);

utils.addGetRouteHandler(app, '/orders', function(request) {
  var service = orderService;
  var command = service.getAllCommand();
  if (request.query.customerId) {
    return service.getByCustomerCommand(request.query.customerId);
  }
  if (request.query.productId) {
    return service.getByProductCommand(request.query.productId);
  }
  return command;
});
utils.createController('/orders', app, orderService);

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
