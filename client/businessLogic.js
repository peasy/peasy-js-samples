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

var ordersDotCom = {
  services: {
    CategoryService,
    CustomerService,
    InventoryItemService,
    OrderItemService,
    OrderService,
    ProductService
  },
  dataProxies: {
    CategoryDataProxy,
    CustomerDataProxy,
    InventoryItemDataProxy,
    OrderDataProxy,
    OrderItemDataProxy,
    ProductDataProxy
  }
};

module.exports = ordersDotCom;