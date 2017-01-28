var peasy = require('peasy-js');
var Promise = require('bluebird')
Promise.promisifyAll(peasy);

var BaseService = require('../business_logic/services/baseService');
var CategoryService = require('../business_logic/services/categoryService');
var CustomerService = require('../business_logic/services/customerService');
var InventoryItemService = require('../business_logic/services/inventoryItemService')
var OrderItemService = require('../business_logic/services/orderItemService');
var OrderService = require('../business_logic/services/orderService');
var ProductService = require('../business_logic/services/productService');

var CategoryDataProxy = require('../data_proxies/http/categoryDataProxy');
var CustomerDataProxy = require('../data_proxies/http/customerDataProxy');
var InventoryItemDataProxy = require('../data_proxies/http/inventoryItemDataProxy');
var OrderDataProxy = require('../data_proxies/http/orderDataProxy');
var OrderItemDataProxy = require('../data_proxies/http/orderItemDataProxy');
var ProductDataProxy = require('../data_proxies/http/productDataProxy');

var categoryService = new CategoryService(new CategoryDataProxy());
var customerService = new CustomerService(new CustomerDataProxy());
var inventoryItemService = new InventoryItemService(new InventoryItemDataProxy());
var orderItemService = new OrderItemService(new OrderItemDataProxy());
var orderService = new OrderService(new OrderDataProxy());
var productService = new ProductService(new ProductDataProxy());

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