var path = require('path');
var routeHelper = require('./routeHelper');
var CustomerService = require('../business_logic/services/customerService');
var CategoryService = require('../business_logic/services/categoryService');
var ProductService = require('../business_logic/services/productService');
var InventoryItemService = require('../business_logic/services/inventoryItemService');
var OrderService = require('../business_logic/services/orderService');
var OrderItemService = require('../business_logic/services/orderItemService');

//MONGO DATA PROXIES
// var proxyFactory = require('../data_proxies/mongo/mongoDataProxyFactory');

//IN-MEMORY DATA PROXIES
var proxyFactory = require('../data_proxies/in-memory/inMemoryDataProxyFactory');

var inventoryItemService = new InventoryItemService(proxyFactory.inventoryItemDataProxy);
var orderItemService = new OrderItemService(proxyFactory.orderItemDataProxy, proxyFactory.productDataProxy, inventoryItemService);
var orderService = new OrderService(proxyFactory.orderDataProxy, orderItemService);
var productService = new ProductService(proxyFactory.productDataProxy, orderService, inventoryItemService);
var customerService = new CustomerService(proxyFactory.customerDataProxy, orderService);
var categoryService = new CategoryService(proxyFactory.categoryDataProxy, productService);

var wireUpRoutes = function(app, io) {
  // ROUTES AND CONTROLLERS
  routeHelper.createController('/customers', app, customerService, io);

  routeHelper.createController('/categories', app, categoryService, io);

  routeHelper.addGetRouteHandler(app, '/products', function(request) {
    var service = productService;
    var command = service.getAllCommand();
    if (request.query.categoryid) {
      command = service.getByCategoryCommand(request.query.categoryid);
    }
    return command;
  });
  routeHelper.createController('/products', app, productService, io);

  routeHelper.addGetRouteHandler(app, '/inventoryItems', function(request) {
    var service = inventoryItemService;
    var command = service.getAllCommand();
    if (request.query.productid) {
      command = service.getByProductCommand(request.query.productid);
    }
    return command;
  });
  routeHelper.createController('/inventoryItems', app, inventoryItemService, io);

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
  }, io);
  routeHelper.addGetRouteHandler(app, '/orders/:id/orderitems', function(request) {
    return orderItemService.getByOrderCommand(request.params.id);
  });
  routeHelper.addPostRouteHandler(app, '/orders/:id/orderitems', function(request) {
    var item = request.body;
    item.orderId = request.params.id;
    return orderItemService.insertCommand(item);
  }, io);
  routeHelper.createController('/orders', app, orderService, io);

  routeHelper.addPostRouteHandler(app, '/orderItems/:id/submit', function(request) {
    return orderItemService.submitCommand(request.params.id);
  }, io, 'update');
  routeHelper.addPostRouteHandler(app, '/orderItems/:id/ship', function(request) {
    return orderItemService.shipCommand(request.params.id);
  }, io, 'update', 'inventoryitems');
  routeHelper.addGetRouteHandler(app, '/orderItems', function(request) {
    var service = orderItemService;
    var command = service.getAllCommand();
    if (request.query.orderid) {
      return service.getByOrderCommand(request.query.orderid);
    }
    return command;
  });
  routeHelper.createController('/orderItems', app, orderItemService, io);

  app.get('/', function(req, res, next) {
    res.render('../../views/index', { title: 'orders.com' });
  });

  app.get('/react', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../client/react/index.html'));
  });

  app.get('/angular', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../client/angular/dist/angular/index.html'));
  });

};

module.exports = wireUpRoutes;
