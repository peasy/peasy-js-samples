var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var utils = require('./utils');
var CustomerService = require('./business_logic/services/customerService');
var CategoryService = require('./business_logic/services/categoryService');
var ProductService = require('./business_logic/services/productService');
var InventoryItemService = require('./business_logic/services/inventoryItemService');
var OrderService = require('./business_logic/services/orderService');
var OrderItemService = require('./business_logic/services/orderItemService');

//MONGO DATA PROXIES
var CategoryDataProxy = require('./data_proxies/mongo/categoryDataProxy');
var CustomerDataProxy = require('./data_proxies/mongo/customerDataProxy');
var ProductDataProxy = require('./data_proxies/mongo/productDataProxy');
var InventoryItemDataProxy = require('./data_proxies/mongo/inventoryItemDataProxy');
var OrderDataProxy = require('./data_proxies/mongo/orderDataProxy.js');
var OrderItemDataProxy = require('./data_proxies/mongo/orderItemDataProxy.js');

var categoryDataProxy = new CategoryDataProxy();
var customerDataProxy = new CustomerDataProxy();
var productDataProxy = new ProductDataProxy();
var inventoryItemDataProxy = new InventoryItemDataProxy();
var orderDataProxy = new OrderDataProxy();
var orderItemDataProxy = new OrderItemDataProxy();

//IN-MEMORY DATA PROXIES
//var InMemoryDataProxy = require('./data_proxies/in-memory/inMemoryDataProxy');
//var ProductDataProxy = require('./data_proxies/in-memory/productDataProxy');
//var InventoryItemDataProxy = require('./data_proxies/in-memory/inventoryItemDataProxy');
//var OrderDataProxy = require('./data_proxies/in-memory/orderDataProxy.js');
//var OrderItemDataProxy = require('./data_proxies/in-memory/orderItemDataProxy.js');

//var categoryDataProxy = new InMemoryDataProxy([{id: 1, name: "Musical Equipment"}, {id: 2, name: "Art Supplies"}]);
//var customerDataProxy = new InMemoryDataProxy([{id: 1, name: "Jimi Hendrix"}]);
//var productDataProxy = new ProductDataProxy([{id: 1, name: "PRS Hollow II", categoryId: 1, price: 2250}, {id: 2, name: "Pastelles", categoryId: 2, price: 10.5}]);
//var inventoryItemDataProxy = new InventoryItemDataProxy([{id: 1, productId: 1, quantityOnHand: 1, version: 1}]);
//var orderItemDataProxy = new OrderItemDataProxy([{"quantity": 2, "amount": 5000, "price": 2250, "productId": 1, "orderId": 1, "status": "PENDING", "id": 1 }]);
//var orderDataProxy = new OrderDataProxy(orderItemDataProxy, [{id: 1, customerId: 1}]);

app.set('x-powered-by', false);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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

var inventoryItemService = new InventoryItemService(inventoryItemDataProxy);
var orderItemService = new OrderItemService(orderItemDataProxy, productDataProxy, inventoryItemService);
var orderService = new OrderService(orderDataProxy, orderItemService);
var productService = new ProductService(productDataProxy, orderService, inventoryItemService);
var customerService = new CustomerService(customerDataProxy, orderService);
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

utils.addPostRouteHandler(app, '/orderItems/:id/submit', function(request) {
  return orderItemService.submitCommand(request.params.id);
});
utils.addPostRouteHandler(app, '/orderItems/:id/ship', function(request) {
  return orderItemService.shipCommand(request.params.id);
});
utils.createController('/orderItems', app, orderItemService);

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var server = app.listen(3000, function() {
  console.log("server running ...");
});
