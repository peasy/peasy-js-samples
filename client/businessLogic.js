var peasy = require('peasy-js');

var BaseService = require('../business_logic/services/baseService');
var CategoryService = require('../business_logic/services/categoryService');
var CustomerService = require('../business_logic/services/customerService');
var InventoryItemService = require('../business_logic/services/inventoryItemService')
var OrderItemService = require('../business_logic/services/clientOrderItemService');
var OrderService = require('../business_logic/services/orderService');
var ProductService = require('../business_logic/services/clientProductService');

var CategoryDataProxy = require('../data_proxies/http/categoryDataProxy');
var CustomerDataProxy = require('../data_proxies/http/customerDataProxy');
var InventoryItemDataProxy = require('../data_proxies/http/inventoryItemDataProxy');
var OrderDataProxy = require('../data_proxies/http/orderDataProxy');
var OrderItemDataProxy = require('../data_proxies/http/orderItemDataProxy');
var ProductDataProxy = require('../data_proxies/http/productDataProxy');

var categoryDataProxy = new CategoryDataProxy();
var customerDataProxy = new CustomerDataProxy(); 
var inventoryItemDataProxy = new InventoryItemDataProxy();
var orderDataProxy = new OrderDataProxy();
var orderItemDataProxy = new OrderItemDataProxy();
var productDataProxy = new ProductDataProxy();

var inventoryItemService = new InventoryItemService(inventoryItemDataProxy);
var orderItemService = new OrderItemService(orderItemDataProxy, productDataProxy, inventoryItemService);
var orderService = new OrderService(orderDataProxy, orderItemService);
var productService = new ProductService(productDataProxy, orderService, inventoryItemService);
var categoryService = new CategoryService(categoryDataProxy, productService);
var customerService = new CustomerService(customerDataProxy, orderService);

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