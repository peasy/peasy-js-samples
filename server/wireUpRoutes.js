var path = require('path');
var routeHelper = require('./routeHelper');
var CustomerService = require('../business_logic/services/customerService');
var CategoryService = require('../business_logic/services/categoryService');
var ProductService = require('../business_logic/services/productService');
var InventoryItemService = require('../business_logic/services/inventoryItemService');
var OrderService = require('../business_logic/services/orderService');
var OrderItemService = require('../business_logic/services/orderItemService');

//MONGO DATA PROXIES
//var proxyFactory = require('./data_proxies/mongo/mongoDataProxyFactory');

//IN-MEMORY DATA PROXIES
var proxyFactory = require('../data_proxies/in-memory/inMemoryDataProxyFactory');

var inventoryItemService = new InventoryItemService(proxyFactory.inventoryItemDataProxy);
var orderItemService = new OrderItemService(proxyFactory.orderItemDataProxy, proxyFactory.productDataProxy, inventoryItemService);
var orderService = new OrderService(proxyFactory.orderDataProxy, orderItemService);
var productService = new ProductService(proxyFactory.productDataProxy, orderService, inventoryItemService);
var customerService = new CustomerService(proxyFactory.customerDataProxy, orderService);
var categoryService = new CategoryService(proxyFactory.categoryDataProxy, productService);

var wireUpRoutes = function(app) {
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
    if (request.query.productid) {
      command = service.getByProductCommand(request.query.productid);
    }
    return command;
  });
  routeHelper.createController('/inventoryItems', app, inventoryItemService);

  routeHelper.addGetRouteHandler(app, '/orders', function(request) {
    var service = orderService;
    var command = service.getAllCommand();
    if (request.query.customerid) {
      return service.getByCustomerCommand(request.query.customerid);
    }
    if (request.query.productid) {
      return service.getByProductCommand(request.query.productid);
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
    var orderItemId = parseInt(request.params.id);
    return orderItemService.submitCommand(orderItemId);
  });
  routeHelper.addPostRouteHandler(app, '/orderItems/:id/ship', function(request) {
    return orderItemService.shipCommand(request.params.id);
  });
  routeHelper.createController('/orderItems', app, orderItemService);

  app.get('/', function(req, res, next) {
    res.render('../../views/index', { title: 'orders.com' });
  });

  app.get('*', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../client/react/index.html'));
  });
};

module.exports = wireUpRoutes;
