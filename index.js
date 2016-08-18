var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var routeHelper = require('./routeHelper');
var CustomerService = require('./business_logic/services/customerService');
var CategoryService = require('./business_logic/services/categoryService');
var ProductService = require('./business_logic/services/productService');
var InventoryItemService = require('./business_logic/services/inventoryItemService');
var OrderService = require('./business_logic/services/orderService');
var OrderItemService = require('./business_logic/services/orderItemService');

//MONGO DATA PROXIES
//var proxyFactory = require('./data_proxies/mongo/mongoDataProxyFactory');

//IN-MEMORY DATA PROXIES
var proxyFactory = require('./data_proxies/in-memory/inMemoryDataProxyFactory');

var inventoryItemService = new InventoryItemService(proxyFactory.inventoryItemDataProxy);
var orderItemService = new OrderItemService(proxyFactory.orderItemDataProxy, proxyFactory.productDataProxy, inventoryItemService);
var orderService = new OrderService(proxyFactory.orderDataProxy, orderItemService);
var productService = new ProductService(proxyFactory.productDataProxy, orderService, inventoryItemService);
var customerService = new CustomerService(proxyFactory.customerDataProxy, orderService);
var categoryService = new CategoryService(proxyFactory.categoryDataProxy, productService);

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

// ROUTES AND CONTROLLERS
routeHelper.createController('/customers', app, customerService);

routeHelper.createController('/categories', app, categoryService);

routeHelper.addGetRouteHandler(app, '/products', function(request) {
  var service = productService;
  var command = service.getAllCommand();
  if (request.query.categoryid) {
    command = service.getByCategoryCommand(request.query.categoryid);
  }
  return command;
});
routeHelper.createController('/products', app, productService);

routeHelper.addGetRouteHandler(app, '/inventoryItems', function(request) {
  var service = inventoryItemService;
  var command = service.getAllCommand();
  if (request.query.productId) {
    command = service.getByProductCommand(request.query.productId);
  }
  return command;
});
routeHelper.createController('/inventoryItems', app, inventoryItemService);

routeHelper.addGetRouteHandler(app, '/orders', function(request) {
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
routeHelper.addGetRouteHandler(app, '/orders/:id/orderitems', function(request) {
  return orderItemService.getByOrderCommand(request.params.id);
});
routeHelper.addPostRouteHandler(app, '/orders/:id/orderitems', function(request) {
  var item = request.body;
  item.orderId = request.params.id;
  return orderItemService.insertCommand(item);
});
routeHelper.createController('/orders', app, orderService);

routeHelper.addPostRouteHandler(app, '/orderItems/:id/submit', function(request) {
  return orderItemService.submitCommand(request.params.id);
});
routeHelper.addPostRouteHandler(app, '/orderItems/:id/ship', function(request) {
  return orderItemService.shipCommand(request.params.id);
});
routeHelper.createController('/orderItems', app, orderItemService);

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var server = app.listen(3000, function() {
  console.log("server running ...");
});
