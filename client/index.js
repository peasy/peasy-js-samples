var BaseService = require('../business_logic/services/baseService');
var CategoryService = require('../business_logic/services/categoryService');
var CustomerService = require('../business_logic/services/customerService');
var InventoryItemService = require('../business_logic/services/inventoryItemService')
var OrderItemService = require('../business_logic/services/orderItemService');
var OrderService = require('../business_logic/services/orderService');
var ProductService = require('../business_logic/services/productService');

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
  }
};

module.exports = ordersDotCom;
