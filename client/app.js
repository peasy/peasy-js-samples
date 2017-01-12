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

( function( ordersDotCom ) {

  var proxy = new ordersDotCom.dataProxies.CustomerDataProxy();
  var service = new ordersDotCom.services.CustomerService(proxy);

  proxy.insert({}, (err, done) => {
    console.log("ERROR", err);
    console.log("DONE", done);
  });

  var command = service.getByIdCommand(1);
  command.execute((err, result) => {
    console.log("GET BY ID: ERROR: ", err);
    console.log("GET BY ID: result: ", result);
  });

  command = service.insertCommand({ name: "Aaron Hanusa" });
  command.execute((err, result) => {
    console.log("INSERT:", err);
    console.log("INSERT: result: ", result);
  });

  //var customer = { name: "Aaron Hanus" };
  //proxy.insert(customer, (err, result) => {
    //console.log("INSERT: ERROR: ", err);
    //console.log("INSERT: result: ", result);
    //proxy.getAll((err, result) => {
      //console.log("GET ALL: ERROR: ", err);
      //console.log("GET ALL: result: ", result);
      //result[1].name = "Aaron Hanusa";
      //proxy.update(result[1], (err, r) => {
        //console.log("UPDATE: ERROR: ", err);
        //console.log("UPDATE: result: ", r);
        //proxy.destroy(result.id, (err, result) => {
          //console.log("DELETE: ERROR: ", err);
          //console.log("DELETE: result: ", result);
          //proxy.getAll((err, result) => {
            //console.log("GET ALL: ERROR: ", err);
            //console.log("GET ALL: result: ", result);
          //});
        //});
      //});
    //});
  //});




} )( ordersDotCom );
