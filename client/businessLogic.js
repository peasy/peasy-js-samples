var peasy = require('peasy-js');

// var BaseService = require('../business_logic/services/baseService');
var CategoryService = require('../business_logic/services/categoryService');
var CustomerService = require('../business_logic/services/customerService');
var InventoryItemService = require('../business_logic/services/inventoryItemService')
var OrderItemService, OrderService, ProductService, proxyFactory;

function configureInMemory() {
  OrderItemService = require('../business_logic/services/orderItemService');
  OrderService = require('../business_logic/services/orderService');
  ProductService = require('../business_logic/services/productService');
  proxyFactory = require('../data_proxies/in-memory/inMemoryDataProxyFactory');
}

function configureHttp() {
  OrderItemService = require('../business_logic/services/clientOrderItemService');
  OrderService = require('../business_logic/services/clientOrderService');
  ProductService = require('../business_logic/services/clientProductService');
  proxyFactory = require('../data_proxies/http/httpDataProxyFactory');
}

// configureInMemory();
configureHttp();

var inventoryItemService = new InventoryItemService(proxyFactory.inventoryItemDataProxy);
var orderItemService = new OrderItemService(proxyFactory.orderItemDataProxy, proxyFactory.productDataProxy, inventoryItemService);
var orderService = new OrderService(proxyFactory.orderDataProxy, orderItemService);
var productService = new ProductService(proxyFactory.productDataProxy, orderService, inventoryItemService);
var categoryService = new CategoryService(proxyFactory.categoryDataProxy, productService);
var customerService = new CustomerService(proxyFactory.customerDataProxy, orderService);

var ordersDotCom = {
  services: {
    categoryService,
    customerService,
    inventoryItemService,
    orderItemService,
    orderService,
    productService
  }
};

module.exports = ordersDotCom;