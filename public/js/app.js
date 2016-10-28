(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("peasy-js"), require("lodash"), require("axios"), require("React"), require("ReactDOM"));
	else if(typeof define === 'function' && define.amd)
		define(["peasy-js", "lodash", "axios", "React", "ReactDOM"], factory);
	else if(typeof exports === 'object')
		exports["ordersDotCom"] = factory(require("peasy-js"), require("lodash"), require("axios"), require("React"), require("ReactDOM"));
	else
		root["ordersDotCom"] = factory(root["peasy"], root["_"], root["axios"], root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_31__, __WEBPACK_EXTERNAL_MODULE_39__, __WEBPACK_EXTERNAL_MODULE_40__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseService = __webpack_require__(1);
	var CategoryService = __webpack_require__(7);
	var CustomerService = __webpack_require__(9);
	var InventoryItemService = __webpack_require__(12);
	var OrderItemService = __webpack_require__(14);
	var OrderService = __webpack_require__(22);
	var ProductService = __webpack_require__(26);

	var CategoryDataProxy = __webpack_require__(29);
	var CustomerDataProxy = __webpack_require__(34);
	var InventoryItemDataProxy = __webpack_require__(35);
	var OrderDataProxy = __webpack_require__(36);
	var OrderItemDataProxy = __webpack_require__(37);
	var ProductDataProxy = __webpack_require__(38);

	var React = __webpack_require__(39);
	var ReactDOM = __webpack_require__(40);

	var ordersDotCom = {
	  services: {
	    CategoryService: CategoryService,
	    CustomerService: CustomerService,
	    InventoryItemService: InventoryItemService,
	    OrderItemService: OrderItemService,
	    OrderService: OrderService,
	    ProductService: ProductService
	  },
	  dataProxies: {
	    CategoryDataProxy: CategoryDataProxy,
	    CustomerDataProxy: CustomerDataProxy,
	    InventoryItemDataProxy: InventoryItemDataProxy,
	    OrderDataProxy: OrderDataProxy,
	    OrderItemDataProxy: OrderItemDataProxy,
	    ProductDataProxy: ProductDataProxy
	  }
	};

	module.exports = ordersDotCom;

	ReactDOM.render(React.createElement(
	  'div',
	  null,
	  React.createElement(
	    'p',
	    null,
	    'Button'
	  )
	), document.getElementById('app'));

	(function (ordersDotCom) {

	  var proxy = new ordersDotCom.dataProxies.CustomerDataProxy();
	  var service = new ordersDotCom.services.CustomerService(proxy);

	  proxy.insert({}, function (err, done) {
	    console.log("ERROR", err);
	    console.log("DONE", done);
	  });

	  var command = service.getByIdCommand(1);
	  command.execute(function (err, result) {
	    console.log("GET BY ID: ERROR: ", err);
	    console.log("GET BY ID: result: ", result);
	  });

	  command = service.insertCommand({ name: "Aaron Hanusa" });
	  command.execute(function (err, result) {
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

	})(ordersDotCom);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BusinessService = __webpack_require__(2).BusinessService;
	var FieldRequiredRule = __webpack_require__(3);
	var utils = __webpack_require__(4);
	var _ = __webpack_require__(5);
	var NotFoundError = __webpack_require__(6);

	var BaseService = BusinessService.extend({
	  functions: {
	    _update: function _update(context, done) {
	      var dataProxy = this.dataProxy;
	      var data = this.data;
	      dataProxy.getById(data.id, function (err, result) {
	        if (err) {
	          return done(err);
	        }
	        if (!result) {
	          return done(new NotFoundError('item ' + data.id + ' not found'));
	        }
	        var entity = _.merge(result, data);
	        dataProxy.update(entity, function (err, result) {
	          if (err) {
	            return done(err);
	          }
	          done(null, result);
	        });
	      });
	    }
	  }
	}).service;

	module.exports = BaseService;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Rule = __webpack_require__(2).Rule;

	var FieldRequiredRule = Rule.extend({
	  params: ['field', 'data'],
	  functions: {
	    _onValidate: function _onValidate(done) {
	      this.data = this.data || {};
	      if (!this.data[this.field]) {
	        this.association = this.field;
	        this._invalidate(this.field + " is required");
	      }
	      done();
	    }
	  }
	});

	module.exports = FieldRequiredRule;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	function stripAllFieldsFrom(entity) {
	  entity = entity || {};
	  return {
	    except: function except(allowableFields) {
	      if (!Array.isArray(allowableFields)) {
	        allowableFields = [allowableFields];
	      }
	      allowableFields.forEach(function (field, index) {
	        allowableFields[index] = field.toLowerCase();
	      });
	      Object.keys(entity).forEach(function (field) {
	        if (allowableFields.indexOf(field.toLowerCase()) === -1) {
	          delete entity[field];
	        }
	      });
	    }
	  };
	}

	var functions = {
	  stripAllFieldsFrom: stripAllFieldsFrom
	};

	module.exports = functions;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	var NotFoundError = function NotFoundError(message) {
	  this.message = message;
	};

	NotFoundError.prototype = new Error();

	module.exports = NotFoundError;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BusinessService = __webpack_require__(2).BusinessService;
	var FieldRequiredRule = __webpack_require__(3);
	var utils = __webpack_require__(4);
	var BaseService = __webpack_require__(1);
	var CanDeleteCategoryRule = __webpack_require__(8);

	var CategoryService = BusinessService.extendService(BaseService, {
	  params: ['dataProxy', 'productService'],
	  functions: {
	    _onInsertCommandInitialization: function _onInsertCommandInitialization(context, done) {
	      var category = this.data;
	      utils.stripAllFieldsFrom(category).except(['name', 'parentid']);
	      done();
	    },
	    _getRulesForInsertCommand: function _getRulesForInsertCommand(context, done) {
	      var category = this.data;
	      done(null, new FieldRequiredRule("name", category));
	    },
	    _onUpdateCommandInitialization: function _onUpdateCommandInitialization(context, done) {
	      var category = this.data;
	      utils.stripAllFieldsFrom(category).except(['id', 'name', 'parentid']);
	      done();
	    },
	    _getRulesForUpdateCommand: function _getRulesForUpdateCommand(context, done) {
	      var category = this.data;
	      done(null, new FieldRequiredRule("name", category));
	    },
	    _getRulesForDestroyCommand: function _getRulesForDestroyCommand(context, done) {
	      var categoryId = this.id;
	      done(null, new CanDeleteCategoryRule(categoryId, this.productService));
	    }
	  }
	}).service;

	module.exports = CategoryService;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Rule = __webpack_require__(2).Rule;

	var CanDeleteCategoryRule = Rule.extend({
	  params: ['categoryId', 'productService'],
	  functions: {
	    _onValidate: function _onValidate(done) {
	      var self = this;
	      this.productService.getByCategoryCommand(this.categoryId).execute(function (err, result) {
	        if (err) {
	          return done(err);
	        }
	        if (result.value && result.value.length > 0) {
	          self._invalidate("This category is associated with one or more products and cannot be deleted");
	        }
	        done();
	      });
	    }
	  }
	});

	module.exports = CanDeleteCategoryRule;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BusinessService = __webpack_require__(2).BusinessService;
	var FieldRequiredRule = __webpack_require__(3);
	var FieldLengthRule = __webpack_require__(10);
	var utils = __webpack_require__(4);
	var BaseService = __webpack_require__(1);
	var CanDeleteCustomerRule = __webpack_require__(11);

	var CustomerService = BusinessService.extendService(BaseService, {
	  params: ['dataProxy', 'orderService'],
	  functions: {
	    _onInsertCommandInitialization: function _onInsertCommandInitialization(context, done) {
	      var customer = this.data;
	      utils.stripAllFieldsFrom(customer).except(['name', 'address']);
	      utils.stripAllFieldsFrom(customer.address).except(['street', 'zip']);
	      done();
	    },
	    _getRulesForInsertCommand: function _getRulesForInsertCommand(context, done) {
	      var customer = this.data;
	      done(null, [new FieldRequiredRule("name", customer).ifValidThenValidate(new FieldLengthRule("name", customer.name, 50))]);
	    },
	    _onUpdateCommandInitialization: function _onUpdateCommandInitialization(context, done) {
	      var customer = this.data;
	      utils.stripAllFieldsFrom(customer).except(['id', 'name', 'address']);
	      utils.stripAllFieldsFrom(customer.address).except(['street', 'zip']);
	      done();
	    },
	    _getRulesForUpdateCommand: function _getRulesForUpdateCommand(context, done) {
	      var customer = this.data;
	      done(null, new FieldLengthRule("name", customer.name, 50));
	    },
	    _getRulesForDestroyCommand: function _getRulesForDestroyCommand(context, done) {
	      var customerId = this.id;
	      done(null, new CanDeleteCustomerRule(customerId, this.orderService));
	    }
	  }
	}).service;

	module.exports = CustomerService;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Rule = __webpack_require__(2).Rule;

	var FieldLengthRule = Rule.extend({
	  params: ['field', 'value', 'length'],
	  functions: {
	    _onValidate: function _onValidate(done) {
	      if (this.value && this.value.length > this.length) {
	        this.association = this.field;
	        this._invalidate(this.field + " accepts a max length of " + this.length);
	      }
	      done();
	    }
	  }
	});

	module.exports = FieldLengthRule;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Rule = __webpack_require__(2).Rule;

	var CanDeleteCustomerRule = Rule.extend({
	  params: ['customerId', 'orderService'],
	  functions: {
	    _onValidate: function _onValidate(done) {
	      var self = this;
	      this.orderService.getByCustomerCommand(this.customerId).execute(function (err, result) {
	        if (err) {
	          return done(err);
	        }
	        if (result.value && result.value.length > 0) {
	          self._invalidate("This customer is associated with one or more orders and cannot be deleted");
	        }
	        done();
	      });
	    }
	  }
	});

	module.exports = CanDeleteCustomerRule;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BusinessService = __webpack_require__(2).BusinessService;
	var FieldRequiredRule = __webpack_require__(3);
	var FieldLengthRule = __webpack_require__(10);
	var FieldTypeRule = __webpack_require__(13);
	var utils = __webpack_require__(4);
	var BaseService = __webpack_require__(1);

	var InventoryItemService = BusinessService.extendService(BaseService, {
	  functions: {
	    _onInsertCommandInitialization: function _onInsertCommandInitialization(context, done) {
	      var item = this.data;
	      utils.stripAllFieldsFrom(item).except(['quantityOnHand', 'productId']);
	      item.version = 1;
	      done();
	    },
	    _getRulesForInsertCommand: function _getRulesForInsertCommand(context, done) {
	      var item = this.data;
	      done(null, [new FieldTypeRule("quantityOnHand", item.quantityOnHand, "number"), new FieldRequiredRule("productId", item), new FieldRequiredRule("version", item).ifValidThenValidate(new FieldTypeRule("version", item.version, "number"))]);
	    },
	    _onUpdateCommandInitialization: function _onUpdateCommandInitialization(context, done) {
	      var item = this.data;
	      utils.stripAllFieldsFrom(item).except(['id', 'quantityOnHand', 'version']);
	      done();
	    },
	    _getRulesForUpdateCommand: function _getRulesForUpdateCommand(context, done) {
	      var item = this.data;
	      done(null, [new FieldTypeRule("quantityOnHand", item.quantityOnHand, "number"), new FieldRequiredRule("version", item).ifValidThenValidate(new FieldTypeRule("version", item.version, "number"))]);
	    }
	  }
	}).createCommand({
	  name: 'getByProductCommand',
	  params: ['productId'],
	  functions: {
	    _onValidationSuccess: function _onValidationSuccess(context, done) {
	      this.dataProxy.getByProduct(this.productId, function (err, result) {
	        done(null, result);
	      });
	    }
	  }
	}).service;

	module.exports = InventoryItemService;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var Rule = __webpack_require__(2).Rule;

	var FieldTypeRule = Rule.extend({
	  params: ['field', 'value', 'type'],
	  functions: {
	    _onValidate: function _onValidate(done) {
	      if (this.value && _typeof(this.value) !== this.type) {
	        this.association = this.field;
	        this._invalidate('Invalid type supplied for ' + this.field + ', expected ' + this.type);
	      }
	      done();
	    }
	  }
	});

	module.exports = FieldTypeRule;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BusinessService = __webpack_require__(2).BusinessService;
	var Rule = __webpack_require__(2).Rule;
	var FieldRequiredRule = __webpack_require__(3);
	var FieldTypeRule = __webpack_require__(13);
	var OrderItemPriceValidityRule = __webpack_require__(15);
	var OrderItemAmountValidityRule = __webpack_require__(16);
	var ValidOrderItemStatusForUpdateRule = __webpack_require__(17);
	var ValidOrderItemStatusForDeleteRule = __webpack_require__(18);
	var CanSubmitOrderItemRule = __webpack_require__(19);
	var utils = __webpack_require__(4);
	var NotFoundError = __webpack_require__(6);
	var ShipOrderItemCommand = __webpack_require__(20);
	var BaseService = __webpack_require__(1);

	var OrderItemService = BusinessService.extendService(BaseService, {
	  params: ['dataProxy', 'productDataProxy', 'inventoryItemService'],
	  functions: {
	    _onInsertCommandInitialization: function _onInsertCommandInitialization(context, done) {
	      var item = this.data;
	      utils.stripAllFieldsFrom(item).except(['orderId', 'productId', 'quantity', 'amount', 'price']);
	      item.status = "PENDING";
	      done();
	    },
	    _getRulesForInsertCommand: function _getRulesForInsertCommand(context, done) {
	      var item = this.data;
	      var productDataProxy = this.productDataProxy;
	      done(null, [Rule.ifAllValid([new FieldRequiredRule("quantity", item).ifValidThenValidate(new FieldTypeRule("quantity", item.quantity, "number")), new FieldRequiredRule("amount", item).ifValidThenValidate(new FieldTypeRule("amount", item.amount, "number")), new FieldRequiredRule("price", item).ifValidThenValidate(new FieldTypeRule("price", item.price, "number")), new FieldRequiredRule("productId", item), new FieldRequiredRule("orderId", item)]).thenGetRules(function (done) {
	        productDataProxy.getById(item.productId, function (err, product) {
	          if (err) {
	            return done(err);
	          }
	          done(null, [new OrderItemPriceValidityRule(item, product), new OrderItemAmountValidityRule(item, product)]);
	        });
	      })]);
	    },
	    _onUpdateCommandInitialization: function _onUpdateCommandInitialization(context, done) {
	      var item = this.data;
	      utils.stripAllFieldsFrom(item).except(['id', 'quantity', 'amount', 'price', 'productId', 'orderId']);
	      done();
	    },
	    _getRulesForUpdateCommand: function _getRulesForUpdateCommand(context, done) {
	      var item = this.data;
	      var productDataProxy = this.productDataProxy;
	      var orderItemDataProxy = this.dataProxy;
	      done(null, Rule.ifAllValid([new FieldRequiredRule("quantity", item).ifValidThenValidate(new FieldTypeRule("quantity", item.quantity, "number")), new FieldRequiredRule("amount", item).ifValidThenValidate(new FieldTypeRule("amount", item.amount, "number")), new FieldRequiredRule("price", item)]).thenGetRules(function (done) {
	        orderItemDataProxy.getById(item.id, function (err, result) {
	          if (err) {
	            return done(err);
	          }
	          var savedItem = result;
	          productDataProxy.getById(item.productId, function (err, product) {
	            if (err) {
	              return done(err);
	            }
	            done(null, new ValidOrderItemStatusForUpdateRule(savedItem).ifValidThenValidate([new OrderItemPriceValidityRule(item, product), new OrderItemAmountValidityRule(item, product)]));
	          });
	        });
	      }));
	    },
	    _getRulesForDestroyCommand: function _getRulesForDestroyCommand(context, done) {
	      var orderItemDataProxy = this.dataProxy;
	      orderItemDataProxy.getById(this.id, function (err, result) {
	        if (err) {
	          return done(err);
	        }
	        var savedItem = result;
	        done(null, new ValidOrderItemStatusForDeleteRule(savedItem));
	      });
	    }
	  }
	}).createCommand({
	  name: 'getByOrderCommand',
	  params: ['orderId'],
	  functions: {
	    _onValidationSuccess: function _onValidationSuccess(context, done) {
	      this.dataProxy.getByOrder(this.orderId, function (err, result) {
	        if (err) {
	          return done(err);
	        }
	        done(null, result);
	      });
	    }
	  }
	}).createCommand({
	  name: 'submitCommand',
	  params: ['orderItemId'],
	  functions: {
	    _getRules: function _getRules(context, done) {
	      this.dataProxy.getById(this.orderItemId, function (err, result) {
	        if (!result) {
	          return done(new NotFoundError("order item not found"), null);
	        }
	        context.orderItem = result;
	        done(null, new CanSubmitOrderItemRule(result));
	      });
	    },
	    _onValidationSuccess: function _onValidationSuccess(context, done) {
	      var orderItem = context.orderItem;
	      orderItem.status = "SUBMITTED";
	      orderItem.submittedOn = new Date();
	      this.dataProxy.update(orderItem, function (err, result) {
	        done(null, result);
	      });
	    }
	  }
	}).service;

	OrderItemService.prototype.shipCommand = function (orderItemId) {
	  return new ShipOrderItemCommand(orderItemId, this.dataProxy, this.inventoryItemService);
	};

	module.exports = OrderItemService;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Rule = __webpack_require__(2).Rule;

	var OrderItemPriceValidityRule = Rule.extend({
	  association: "price",
	  params: ['orderItem', 'product'],
	  functions: {
	    _onValidate: function _onValidate(done) {
	      if (this.orderItem.price !== this.product.price) {
	        this._invalidate('The price for ' + this.product.name + ' no longer reflects the current price in our system');
	      }
	      done();
	    }
	  }
	});

	module.exports = OrderItemPriceValidityRule;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Rule = __webpack_require__(2).Rule;

	var OrderItemAmountValidityRule = Rule.extend({
	  association: "amount",
	  params: ['orderItem', 'product'],
	  functions: {
	    _onValidate: function _onValidate(done) {
	      if (this.orderItem.amount !== this.product.price * this.orderItem.quantity) {
	        this._invalidate('The amount for the ' + this.product.name + ' order item does not equal the quanity multiplied by the current price in our system');
	      }
	      done();
	    }
	  }
	});

	module.exports = OrderItemAmountValidityRule;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Rule = __webpack_require__(2).Rule;

	var ValidOrderItemStatusForUpdateRule = Rule.extend({
	  params: ['orderItem'],
	  functions: {
	    _onValidate: function _onValidate(done) {
	      if (this.orderItem.status.toUpperCase() === "BACKORDERED") {
	        this._invalidate('Backordered items cannot be changed');
	      } else if (this.orderItem.status.toUpperCase() === "SHIPPED") {
	        this._invalidate('Shipped items cannot be changed');
	      }
	      done();
	    }
	  }
	});

	module.exports = ValidOrderItemStatusForUpdateRule;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Rule = __webpack_require__(2).Rule;

	var ValidOrderItemStatusForDeleteRule = Rule.extend({
	  params: ['orderItem'],
	  functions: {
	    _onValidate: function _onValidate(done) {
	      if (this.orderItem.status.toUpperCase() === "SHIPPED") {
	        this._invalidate('Shipped items cannot be deleted');
	      }
	      done();
	    }
	  }
	});

	module.exports = ValidOrderItemStatusForDeleteRule;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Rule = __webpack_require__(2).Rule;

	var CanSubmitOrderItemRule = Rule.extend({
	  params: ['orderItem'],
	  functions: {
	    _onValidate: function _onValidate(done) {
	      if (this.orderItem.status !== "PENDING") {
	        this._invalidate('Order item ' + this.orderItem.id + ' must be in a pending state to be submitted');
	      }
	      done();
	    }
	  }
	});

	module.exports = CanSubmitOrderItemRule;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Command = __webpack_require__(2).Command;
	var CanShipOrderItemRule = __webpack_require__(21);

	var ShipOrderItemCommand = Command.extend({
	  params: ['orderItemId', 'orderItemDataProxy', 'inventoryItemService'],
	  functions: {
	    _getRules: function _getRules(context, done) {
	      this.orderItemDataProxy.getById(this.orderItemId, function (err, orderItem) {
	        if (err) {
	          return done(err);
	        }
	        context.currentOrderItem = orderItem;
	        done(null, new CanShipOrderItemRule(orderItem));
	      });
	    },
	    _onValidationSuccess: function _onValidationSuccess(context, done) {
	      var currentOrderItem = context.currentOrderItem;
	      var inventoryItemService = this.inventoryItemService;
	      var orderItemDataProxy = this.orderItemDataProxy;

	      inventoryItemService.getByProductCommand(currentOrderItem.productId).execute(function (err, result) {
	        if (err) {
	          return done(err);
	        }
	        var inventoryItem = result.value;
	        if (inventoryItem.quantityOnHand - currentOrderItem.quantity >= 0) {
	          currentOrderItem.status = "SHIPPED";
	          currentOrderItem.shippedOn = new Date();
	          inventoryItem.quantityOnHand -= currentOrderItem.quantity;
	          inventoryItemService.updateCommand(inventoryItem).execute(function (err, result) {
	            if (err) {
	              return done(err);
	            }
	            saveOrderItem(currentOrderItem, done);
	          });
	        } else {
	          currentOrderItem.status = "BACKORDERED";
	          currentOrderItem.backorderedOn = new Date();
	          saveOrderItem(currentOrderItem, done);
	        }
	      });

	      function saveOrderItem(item, done) {
	        orderItemDataProxy.update(item, function (err, orderItem) {
	          if (err) {
	            return done(err);
	          }
	          done(null, orderItem);
	        });
	      }
	    }
	  }
	});

	module.exports = ShipOrderItemCommand;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Rule = __webpack_require__(2).Rule;

	var CanShipOrderItemRule = Rule.extend({
	  params: ['orderItem'],
	  functions: {
	    _onValidate: function _onValidate(done) {
	      var validStatuses = ["SUBMITTED", "BACKORDERED"];
	      if (validStatuses.indexOf(this.orderItem.status) === -1) {
	        this._invalidate('Order item ' + this.orderItem.id + ' is not in a shippable state');
	      }
	      done();
	    }
	  }
	});

	module.exports = CanShipOrderItemRule;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BusinessService = __webpack_require__(2).BusinessService;
	var FieldRequiredRule = __webpack_require__(3);
	var FieldLengthRule = __webpack_require__(10);
	var FieldTypeRule = __webpack_require__(13);
	var utils = __webpack_require__(4);
	var BaseService = __webpack_require__(1);
	var ValidOrderStatusForUpdateRule = __webpack_require__(23);
	var DeleteOrderCommand = __webpack_require__(24);

	var OrderService = BusinessService.extendService(BaseService, {
	  params: ['dataProxy', 'orderItemService'],
	  functions: {
	    _onInsertCommandInitialization: function _onInsertCommandInitialization(context, done) {
	      var order = this.data;
	      utils.stripAllFieldsFrom(order).except(['customerId']);
	      order.orderDate = new Date();
	      done();
	    },
	    _getRulesForInsertCommand: function _getRulesForInsertCommand(context, done) {
	      var order = this.data;
	      done(null, new FieldRequiredRule("customerId", order));
	    },
	    _onUpdateCommandInitialization: function _onUpdateCommandInitialization(context, done) {
	      var order = this.data;
	      utils.stripAllFieldsFrom(order).except(['id', 'customerId']);
	      done();
	    },
	    _getRulesForUpdateCommand: function _getRulesForUpdateCommand(context, done) {
	      var order = this.data;
	      done(null, new ValidOrderStatusForUpdateRule(order.id, this.orderItemService));
	    }
	  }
	}).createCommand({
	  name: 'getByCustomerCommand',
	  params: ['customerId'],
	  functions: {
	    _onValidationSuccess: function _onValidationSuccess(context, done) {
	      this.dataProxy.getByCustomer(this.customerId, function (err, result) {
	        done(null, result);
	      });
	    }
	  }
	}).createCommand({
	  name: 'getByProductCommand',
	  params: ['productId'],
	  functions: {
	    _getRules: function _getRules(context, done) {
	      done(null, []);
	    },
	    _onValidationSuccess: function _onValidationSuccess(context, done) {
	      this.dataProxy.getByProduct(this.productId, function (err, result) {
	        done(null, result);
	      });
	    }
	  }
	}).service;

	OrderService.prototype.destroyCommand = function (orderId) {
	  return new DeleteOrderCommand(orderId, this.dataProxy, this.orderItemService);
	};

	module.exports = OrderService;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Rule = __webpack_require__(2).Rule;

	var ValidOrderStatusForUpdateRule = Rule.extend({
	  params: ['orderId', 'orderItemService'],
	  functions: {
	    _onValidate: function _onValidate(done) {
	      var self = this;
	      self.orderItemService.getByOrderCommand(self.orderId).execute(function (err, result) {
	        if (err) {
	          return done(err);
	        }
	        if (result.value) {
	          var shippedItems = result.value.some(function (item) {
	            return item.status === "SHIPPED";
	          });
	          if (shippedItems) {
	            self._invalidate('This order cannot change because it contains items that have been shipped');
	          }
	        }
	        done();
	      });
	    }
	  }
	});

	module.exports = ValidOrderStatusForUpdateRule;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Command = __webpack_require__(2).Command;
	var Rule = __webpack_require__(2).Rule;
	var CanShipOrderItemRule = __webpack_require__(21);
	var CanDeleteProductRule = __webpack_require__(25);

	var DeleteOrderCommand = Command.extend({
	  params: ['orderId', 'orderDataProxy', 'orderItemService'],
	  functions: {
	    _getRules: function _getRules(context, done) {
	      var orderItemService = this.orderItemService;
	      orderItemService.getByOrderCommand(this.orderId).execute(function (err, result) {
	        if (err) {
	          return done(err);
	        }
	        context.currentOrderItems = result.value;
	        var commands = result.value.map(function (i) {
	          return orderItemService.destroyCommand(i.id);
	        });
	        Rule.getAllRulesFrom(commands, function (err, rules) {
	          done(err, rules);
	        });
	      });
	    },
	    _onValidationSuccess: function _onValidationSuccess(context, done) {
	      var _this = this;

	      var currentOrderItems = context.currentOrderItems;
	      var commands = currentOrderItems.map(function (i) {
	        return _this.orderItemService.destroyCommand(i.id);
	      });
	      var orderDataProxy = this.orderDataProxy;
	      var orderId = this.orderId;
	      Command.executeAll(commands, function (err, results) {
	        if (err) {
	          return done(err, results);
	        }
	        orderDataProxy.destroy(orderId, function (err, result) {
	          done();
	        });
	      });
	    }
	  }
	});

	module.exports = DeleteOrderCommand;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Rule = __webpack_require__(2).Rule;

	var CanDeleteProductRule = Rule.extend({
	  params: ['productId', 'orderService'],
	  functions: {
	    _onValidate: function _onValidate(done) {
	      var self = this;
	      this.orderService.getByProductCommand(this.productId).execute(function (err, result) {
	        if (err) {
	          return done(err);
	        }
	        if (result.value && result.value.length > 0) {
	          self._invalidate("This product is associated with one or more orders and cannot be deleted");
	        }
	        done();
	      });
	    }
	  }
	});

	module.exports = CanDeleteProductRule;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BusinessService = __webpack_require__(2).BusinessService;
	var FieldRequiredRule = __webpack_require__(3);
	var FieldLengthRule = __webpack_require__(10);
	var FieldTypeRule = __webpack_require__(13);
	var utils = __webpack_require__(4);
	var BaseService = __webpack_require__(1);
	var DeleteProductCommand = __webpack_require__(27);
	var CreateProductCommand = __webpack_require__(28);

	var ProductService = BusinessService.extendService(BaseService, {
	  params: ['dataProxy', 'orderService', 'inventoryItemService'],
	  functions: {
	    _onUpdateCommandInitialization: function _onUpdateCommandInitialization(context, done) {
	      var product = this.data;
	      utils.stripAllFieldsFrom(product).except(['id', 'name', 'description', 'price', 'categoryId']);
	      done();
	    },
	    _getRulesForUpdateCommand: function _getRulesForUpdateCommand(context, done) {
	      var product = this.data;
	      done(null, [new FieldLengthRule("name", product.name, 50), new FieldTypeRule("price", product.price, "number")]);
	    }
	  }
	}).createCommand({
	  name: 'getByCategoryCommand',
	  params: ['categoryId'],
	  functions: {
	    _onValidationSuccess: function _onValidationSuccess(context, done) {
	      this.dataProxy.getByCategory(this.categoryId, function (err, result) {
	        done(null, result);
	      });
	    }
	  }
	}).service;

	ProductService.prototype.insertCommand = function (product) {
	  return new CreateProductCommand(product, this.dataProxy, this.inventoryItemService);
	};

	ProductService.prototype.destroyCommand = function (productId) {
	  return new DeleteProductCommand(productId, this.dataProxy, this.orderService, this.inventoryItemService);
	};

	module.exports = ProductService;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Command = __webpack_require__(2).Command;
	var CanShipOrderItemRule = __webpack_require__(21);
	var CanDeleteProductRule = __webpack_require__(25);

	var DeleteProductCommand = Command.extend({
	  params: ['productId', 'productDataProxy', 'orderService', 'inventoryItemService'],
	  functions: {
	    _getRules: function _getRules(context, done) {
	      done(null, new CanDeleteProductRule(this.productId, this.orderService));
	    },
	    _onValidationSuccess: function _onValidationSuccess(context, done) {
	      var inventoryItemService = this.inventoryItemService;
	      var productDataProxy = this.productDataProxy;
	      var productId = this.productId;
	      inventoryItemService.getByProductCommand(this.productId).execute(function (err, result) {
	        if (err) {
	          return done(err);
	        }
	        inventoryItemService.destroyCommand(result.value.id).execute(function (err, result) {
	          if (err) {
	            return done(err);
	          }
	          productDataProxy.destroy(productId, function (err, result) {
	            done();
	          });
	        });
	      });
	    }
	  }
	});

	module.exports = DeleteProductCommand;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Command = __webpack_require__(2).Command;
	var CanShipOrderItemRule = __webpack_require__(21);
	var CanDeleteProductRule = __webpack_require__(25);
	var utils = __webpack_require__(4);
	var FieldRequiredRule = __webpack_require__(3);
	var FieldLengthRule = __webpack_require__(10);
	var FieldTypeRule = __webpack_require__(13);

	var CreateProductCommand = Command.extend({
	  params: ['product', 'productDataProxy', 'inventoryItemService'],
	  functions: {
	    _onInitialization: function _onInitialization(context, done) {
	      var product = this.product;
	      utils.stripAllFieldsFrom(product).except(['name', 'description', 'price', 'categoryId']);
	      done();
	    },
	    _getRules: function _getRules(context, done) {
	      var product = this.product;
	      done(null, [new FieldRequiredRule("name", product).ifValidThenValidate(new FieldLengthRule("name", product.name, 50)), new FieldRequiredRule("price", product).ifValidThenValidate(new FieldTypeRule("price", product.price, "number")), new FieldRequiredRule("categoryId", product)]);
	    },
	    _onValidationSuccess: function _onValidationSuccess(context, done) {
	      var inventoryService = this.inventoryItemService;
	      var newProduct;
	      this.productDataProxy.insert(this.product, function (err, result) {
	        if (err) {
	          return done(err);
	        }
	        newProduct = result;
	        var inventoryItem = {
	          productId: newProduct.id,
	          quantityOnHand: 0
	        };
	        inventoryService.insertCommand(inventoryItem).execute(function (err, result) {
	          if (err) {
	            return done(err);
	          }
	          done(null, newProduct);
	        });
	      });
	    }
	  }
	});

	module.exports = CreateProductCommand;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var HttpDataProxy = __webpack_require__(30);

	var CategoryDataProxy = function CategoryDataProxy() {
	  HttpDataProxy.call(this, 'categories');
	};

	CategoryDataProxy.prototype = new HttpDataProxy();

	module.exports = CategoryDataProxy;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var axious = __webpack_require__(31);
	var ServiceException = __webpack_require__(32).ServiceException;
	var ConcurrencyError = __webpack_require__(33);
	var NotFoundError = __webpack_require__(6);

	var HttpDataProxy = function HttpDataProxy(entity) {
	  this._url = '/' + entity;
	};

	HttpDataProxy.prototype.getAll = function (done) {
	  handleResponseFrom(axios.get(this._url), done);
	};

	HttpDataProxy.prototype.getById = function (id, done) {
	  handleResponseFrom(axios.get(this._url + '/' + id), done);
	};

	HttpDataProxy.prototype.insert = function (data, done) {
	  handleResponseFrom(axios.post(this._url, data), done);
	};

	HttpDataProxy.prototype.update = function (data, done) {
	  handleResponseFrom(axios.put(this._url + '/' + data.id, data), done);
	};

	HttpDataProxy.prototype.destroy = function (id, done) {
	  handleResponseFrom(axios.delete(this._url + '/' + id), done);
	};

	function handleResponseFrom(promise, done) {
	  promise.then(function (response) {
	    return done(null, response.data);
	  }).catch(function (err) {
	    return done(getError(err));
	  });
	}

	var httpStatusCodes = {
	  badRequest: 400,
	  conflict: 409,
	  notFound: 404,
	  notImplemented: 501
	};

	function getError(err) {
	  switch (err.response.status) {
	    case httpStatusCodes.badRequest:
	      var serviceException = new ServiceException(err.message);
	      if (Array.isArray(err.response.data)) {
	        serviceException.errors = err.response.data;
	      }
	      return serviceException;

	    case httpStatusCodes.conflict:
	      return new ConcurrencyError(err.message);

	    case httpStatusCodes.notFound:
	      return new NotFoundError(err.message);

	    default:
	      return err;
	  }
	}

	module.exports = HttpDataProxy;

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_31__;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["peasy"] = factory();
		else
			root["peasy"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		var BusinessService = __webpack_require__(1);
		var Command = __webpack_require__(2);
		var ExecutionResult = __webpack_require__(3);
		var Rule = __webpack_require__(6);
		var ServiceException = __webpack_require__(4);

		module.exports = {
		  BusinessService: BusinessService,
		  Command: Command,
		  ExecutionResult: ExecutionResult,
		  Rule: Rule,
		  ServiceException: ServiceException
		};

	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {

		var Command = __webpack_require__(2);

		var BusinessService = function () {

		  "use strict";

		  // BUSINESS SERVICE

		  var BusinessService = function (dataProxy) {
		    if (this instanceof BusinessService) {
		      this.dataProxy = dataProxy;
		    } else {
		      return new BusinessService(dataProxy);
		    }
		  };

		  BusinessService.extendService = function (service, options) {
		    options.service = service;
		    return BusinessService.extend(options);
		  };

		  BusinessService.extend = function (options) {

		    options = options || {};
		    options.params = options.params || ['dataProxy'];
		    options.functions = options.functions || {};

		    var Extended = function () {
		      var self = this;
		      self.arguments = arguments;
		      BusinessService.call(this);
		      options.params.forEach(function (field, index) {
		        self[field] = self.arguments[index];
		      });
		    };

		    var Service = options.service || BusinessService;
		    Extended.prototype = new Service();
		    var keys = Object.keys(BusinessService.prototype);
		    Object.keys(options.functions).forEach(function (key) {
		      if (keys.indexOf(key) === -1) {
		        console.warn("The method: '" + key + "' is not an overridable method of BusinessService");
		      }
		      Extended.prototype[key] = options.functions[key];
		    });

		    function createCommand(options) {
		      options = options || {};
		      options.service = Extended;
		      BusinessService.createCommand(options);
		      return {
		        createCommand: createCommand,
		        service: Extended
		      };
		    }

		    return {
		      createCommand: createCommand,
		      service: Extended
		    };
		  };

		  BusinessService.createCommand = function (options) {

		    function capitalize(value) {
		      return value.charAt(0).toUpperCase() + value.slice(1);
		    }

		    options = options || {};

		    if (!options.name) {
		      throw new Error('A value for name must be supplied');
		    }

		    if (!options.service) {
		      throw new Error('A function for the service argument must be supplied');
		    }

		    var name = options.name;
		    var onInitialization = '_on' + capitalize(name) + 'Initialization';
		    var getRules = '_getRulesFor' + capitalize(name);
		    var onValidationSuccess = '_' + name.replace("Command", "");
		    var commandParams = '_' + name + 'Params';
		    var functions = options.functions || {};
		    var service = options.service;

		    service.prototype[onInitialization] = functions._onInitialization || function (context, done) {
		      done();
		    };

		    service.prototype[getRules] = functions._getRules || function (context, done) {
		      done(null, []);
		    };

		    service.prototype[onValidationSuccess] = functions._onValidationSuccess || function (context, done) {
		      done();
		    };

		    service.prototype[commandParams] = options.params || [];

		    service.prototype[name] = function () {
		      var serviceInstance = this;

		      var command = new Command({
		        _onInitialization: function (context, done) {
		          serviceInstance[onInitialization].call(this, context, done);
		        },
		        _getRules: function (context, done) {
		          return serviceInstance[getRules].call(this, context, done);
		        },
		        _onValidationSuccess: function (context, done) {
		          return serviceInstance[onValidationSuccess].call(this, context, done);
		        }
		      });

		      var constructorArgs = arguments;
		      serviceInstance[commandParams].forEach(function (param, index) {
		        command[param] = constructorArgs[index];
		      });

		      Object.keys(serviceInstance).forEach(key => {
		        command[key] = serviceInstance[key];
		      });

		      return command;
		    };

		    return service;
		  };

		  Object.defineProperty(BusinessService.prototype, "constructor", {
		    enumerable: false,
		    value: BusinessService
		  });

		  BusinessService.createCommand({
		    name: "getByIdCommand",
		    service: BusinessService,
		    params: ["id"],
		    functions: {
		      _onValidationSuccess: function (context, done) {
		        this.dataProxy.getById(this.id, done);
		      }
		    }
		  });

		  BusinessService.createCommand({
		    name: "getAllCommand",
		    service: BusinessService,
		    functions: {
		      _onValidationSuccess: function (context, done) {
		        this.dataProxy.getAll(done);
		      }
		    }
		  });

		  BusinessService.createCommand({
		    name: "insertCommand",
		    service: BusinessService,
		    params: ["data"],
		    functions: {
		      _onValidationSuccess: function (context, done) {
		        this.dataProxy.insert(this.data, done);
		      }
		    }
		  });

		  BusinessService.createCommand({
		    name: "updateCommand",
		    service: BusinessService,
		    params: ["data"],
		    functions: {
		      _onValidationSuccess: function (context, done) {
		        this.dataProxy.update(this.data, done);
		      }
		    }
		  });

		  BusinessService.createCommand({
		    name: "destroyCommand",
		    service: BusinessService,
		    params: ["id"],
		    functions: {
		      _onValidationSuccess: function (context, done) {
		        this.dataProxy.destroy(this.id, done);
		      }
		    }
		  });

		  return BusinessService;
		}();

		module.exports = BusinessService;

	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {

		var ExecutionResult = __webpack_require__(3);
		var ServiceException = __webpack_require__(4);
		var RulesValidator = __webpack_require__(5);

		var Command = function () {

		  "use strict";

		  var Command = function (callbacks) {
		    callbacks = callbacks || {};
		    if (this instanceof Command) {

		      if (!this._onInitialization) {
		        // allow for inheritance (ES6)
		        this._onInitialization = callbacks._onInitialization || function (context, done) {
		          done();
		        };
		      }

		      if (!this._getRules) {
		        // allow for inheritance (ES6)
		        this._getRules = callbacks._getRules || function (context, done) {
		          done(null, []);
		        };
		      }

		      if (!this._onValidationSuccess) {
		        // allow for inheritance (ES6)
		        this._onValidationSuccess = callbacks._onValidationSuccess || function (context, done) {
		          done();
		        };
		      }
		    } else {
		      return new Command(callbacks.onInitialization, callbacks.getRules, callbacks.onValidationSuccess);
		    }
		  };

		  Command.prototype = {

		    constructor: Command,

		    execute: function (done) {
		      var self = this;
		      var context = {};

		      self._onInitialization(context, function (err) {

		        if (err) return done(err);

		        self._getRules(context, function (err, rules) {

		          if (err) return done(err);

		          if (!Array.isArray(rules)) {
		            rules = [rules];
		          }

		          new RulesValidator(rules).validate(function (err) {

		            if (err) return done(err);

		            var errors = rules.filter(function (rule) {
		              return !rule.valid;
		            }).map(function (rule) {
		              return rule.errors;
		            });

		            errors = [].concat.apply([], errors); // flatten array

		            if (errors.length > 0) return done(null, new ExecutionResult(false, null, errors));

		            try {
		              self._onValidationSuccess(context, function (err, result) {
		                if (err) return done(err);
		                done(null, new ExecutionResult(true, result, null));
		              });
		            } catch (ex) {
		              if (ex instanceof ServiceException) {
		                done(null, new ExecutionResult(false, null, [{ association: ex.association, message: ex.message }]));
		              } else {
		                done(ex);
		              }
		            }
		          });
		        });
		      });
		    }
		  };

		  Command.extend = function (options) {
		    options = options || {};
		    var params = options.params || [];
		    var functions = options.functions || {};

		    var Extended = function () {
		      var self = this;
		      self.arguments = arguments;
		      params.forEach(function (param, index) {
		        self[param] = self.arguments[index];
		      });
		    };

		    Extended.prototype = new Command();

		    Extended.prototype._onInitialization = functions._onInitialization || function (context, done) {
		      done();
		    };

		    Extended.prototype._getRules = functions._getRules || function (context, done) {
		      done(null, []);
		    };

		    Extended.prototype._onValidationSuccess = functions._onValidationSuccess || function (context, done) {
		      done();
		    };

		    return Extended;
		  };

		  Command.executeAll = function (commands, done) {

		    if (!Array.isArray(commands)) {
		      commands = [commands];
		    }

		    var count = commands.length;

		    if (count < 1) {
		      return done();
		    }

		    var current = 0;
		    var results = [];

		    commands.forEach(function (command) {
		      command.execute(onComplete);
		    });

		    function onComplete(err, result) {
		      if (err) {
		        return done(err, results);
		      }
		      current++;
		      results.push(result);
		      if (current === count) {
		        done(null, results);
		      }
		    }
		  };

		  return Command;
		}();

		module.exports = Command;

	/***/ },
	/* 3 */
	/***/ function(module, exports) {

		var ExecutionResult = function () {

		  "use strict";

		  var ExecutionResult = function (success, value, errors) {
		    if (this instanceof ExecutionResult) {
		      this.success = success;
		      this.value = value;
		      this.errors = errors;
		    } else {
		      return new ExecutionResult(success, value, errors);
		    }
		  };

		  return ExecutionResult;
		}();

		module.exports = ExecutionResult;

	/***/ },
	/* 4 */
	/***/ function(module, exports) {

		var ServiceException = function (message) {
		  this.message = message;
		};

		ServiceException.prototype = new Error();

		module.exports = ServiceException;

	/***/ },
	/* 5 */
	/***/ function(module, exports) {

		var RulesValidator = function () {
		  "use strict";

		  // RULES VALIDATOR

		  var RulesValidator = function (rules) {
		    if (this instanceof RulesValidator) {
		      this.rules = rules;
		    } else {
		      return new RulesValidator(rules);
		    }
		  };

		  RulesValidator.prototype.validate = function (done) {
		    var self = this;
		    var counter = self.rules.length;
		    var errors = [];

		    function onRuleValidated(err) {
		      if (err) errors.push(err);
		      counter--;
		      if (counter === 0) {
		        if (errors.length === 0) {
		          return done();
		        }
		        done(errors);
		      }
		    }

		    if (self.rules.length > 0) {
		      self.rules.forEach(function (rule) {
		        rule.validate(onRuleValidated);
		      });
		    } else {
		      done();
		    }
		  };

		  return RulesValidator;
		}();

		module.exports = RulesValidator;

	/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {

		var RulesValidator = __webpack_require__(5);

		var Rule = function () {

		  "use strict";

		  var Rule = function (options) {
		    if (this instanceof Rule) {
		      options = options || {};
		      this.association = options.association || null;
		      this.errors = [];
		      this.ifInvalidThenFn = null;
		      this.ifValidThenFn = null;
		      this.ifValidThenGetRulesFn = null;
		      this.successors = [];
		      this.valid = true;
		    } else {
		      return new Rule();
		    }
		  };

		  Rule.getAllRulesFrom = function (commands, done) {

		    if (!Array.isArray(commands)) {
		      commands = [commands];
		    }

		    var count = commands.length;

		    if (count < 1) return done(null, []);

		    var current = 0;
		    var context = {};
		    var rules = [];

		    commands.forEach(command => {
		      command._getRules(context, onComplete);
		    });

		    function onComplete(err, rule) {
		      if (err) {
		        return done(err, rules);
		      }
		      if (Array.isArray(rule)) {
		        rule.forEach(function (r) {
		          rules.push(r);
		        });
		      } else {
		        rules.push(rule);
		      }
		      current++;
		      if (current === count) {
		        done(null, rules);
		      }
		    }
		  };

		  Rule.ifAllValid = function (rules) {

		    function thenGetRules(func) {
		      var rule = new Rule();
		      rule._onValidate = function (done) {
		        done();
		      };

		      rule.successors = rules;
		      rule.ifValidThenGetRulesFn = func;
		      return rule;
		    }

		    return {
		      thenGetRules: thenGetRules
		    };
		  };

		  Rule.extend = function (options) {
		    options = options || {};
		    options.functions = options.functions || {};

		    if (typeof options.functions._onValidate !== 'function') {
		      throw new Error('An onValidate method needs to be supplied to execute!');
		    }

		    options.association = options.association || null;
		    options.params = options.params || [];

		    var Extended = function () {
		      var self = this;
		      self.arguments = arguments;
		      Rule.call(self, { association: options.association });
		      options.params.forEach(function (field, index) {
		        self[field] = self.arguments[index];
		      });
		    };

		    Extended.prototype = new Rule();
		    Extended.prototype._onValidate = options.functions._onValidate;

		    return Extended;
		  };

		  Rule.prototype = {

		    constructor: Rule,

		    _invalidate: function (errors) {
		      var self = this;
		      this.valid = false;
		      if (!Array.isArray(errors)) {
		        errors = [errors];
		      }
		      errors.forEach(function (err) {
		        if (typeof err === "string") {
		          self.errors.push({ association: self.association, message: err });
		        } else {
		          self.errors.push(err);
		        }
		      });
		    },

		    _onValidate: function (done) {},

		    validate: function (done) {
		      var self = this;
		      self.errors = [];

		      this._onValidate(function (err) {
		        if (err) return done(err);
		        if (self.valid) {
		          if (self.ifValidThenFn) {
		            self.ifValidThenFn();
		          }
		          if (self.successors.length > 0) {
		            new RulesValidator(self.successors).validate(function (err) {
		              if (err) return done(err);
		              invalidate(self).ifAnyInvalid(self.successors);
		              if (self.ifValidThenGetRulesFn) {
		                return invokeNextRules(self, self.successors, done);
		              }
		              done();
		            });
		            return;
		          } else {
		            if (self.ifValidThenGetRulesFn) {
		              return invokeNextRules(self, self.successors, done);
		            }
		          }
		        } else {
		          if (self.ifInvalidThenFn) {
		            self.ifInvalidThenFn();
		          }
		        }
		        done();
		      });

		      function invokeNextRules(rule, rules, done) {
		        var failedRules = rules.filter(function (rule) {
		          return !rule.valid;
		        });
		        if (failedRules.length === 0) {
		          rule.ifValidThenGetRulesFn(function (err, result) {
		            if (!Array.isArray(result)) {
		              result = [result];
		            }
		            new RulesValidator(result).validate(function (err) {
		              if (err) return done(err);
		              invalidate(rule).ifAnyInvalid(result);
		              done();
		            });
		          });
		        } else {
		          done();
		        }
		      }

		      function invalidate(rule) {

		        function ifAnyInvalid(rules) {
		          rules.filter(function (r) {
		            return !r.valid;
		          }).forEach(function (r) {
		            rule._invalidate(r.errors);
		          });
		        }

		        return { ifAnyInvalid: ifAnyInvalid };
		      }
		    },

		    ifValidThenValidate: function (rules) {
		      if (!Array.isArray(rules)) {
		        rules = [rules];
		      }
		      this.successors = rules;
		      return this;
		    },

		    ifValidThenExecute: function (funcToExecute) {
		      this.ifValidThenFn = funcToExecute;
		      return this;
		    },

		    ifInvalidThenExecute: function (funcToExecute) {
		      this.ifInvalidThenFn = funcToExecute;
		      return this;
		    },

		    ifValidThenGetRules: function (funcToExecute) {
		      this.ifValidThenGetRulesFn = funcToExecute;
		      return this;
		    }

		  };

		  return Rule;
		}();

		module.exports = Rule;

	/***/ }
	/******/ ])
	});
	;

/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict";

	var ConcurrencyError = function ConcurrencyError(message) {
	  this.message = message;
	};

	ConcurrencyError.prototype = new Error();

	module.exports = ConcurrencyError;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var HttpDataProxy = __webpack_require__(30);

	var CustomerDataProxy = function CustomerDataProxy() {
	  HttpDataProxy.call(this, 'customers');
	};

	CustomerDataProxy.prototype = new HttpDataProxy();

	module.exports = CustomerDataProxy;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var HttpDataProxy = __webpack_require__(30);

	var InventoryItemDataProxy = function InventoryItemDataProxy() {
	  HttpDataProxy.call(this, 'inventoryitems');
	};

	InventoryItemDataProxy.prototype.getByProduct = function (productId, done) {};

	InventoryItemDataProxy.prototype = new HttpDataProxy();

	module.exports = InventoryItemDataProxy;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var HttpDataProxy = __webpack_require__(30);

	var OrderDataProxy = function OrderDataProxy() {
	  HttpDataProxy.call(this, 'orders');
	};

	OrderDataProxy.prototype = new HttpDataProxy();

	OrderDataProxy.prototype.getByCustomer = function (customerId, done) {};

	OrderDataProxy.prototype.getByProduct = function (productId, done) {};

	module.exports = OrderDataProxy;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var HttpDataProxy = __webpack_require__(30);

	var OrderItemDataProxy = function OrderItemDataProxy() {
	  HttpDataProxy.call(this, 'orderitems');
	};

	OrderItemDataProxy.prototype = new HttpDataProxy();

	OrderItemDataProxy.prototype.getByOrder = function (orderId, done) {};

	module.exports = OrderItemDataProxy;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var HttpDataProxy = __webpack_require__(30);

	var ProductDataProxy = function ProductDataProxy() {
	  HttpDataProxy.call(this, 'products');
	};

	ProductDataProxy.prototype = new HttpDataProxy();

	ProductDataProxy.prototype.getByCategory = function (categoryId, done) {};

	module.exports = ProductDataProxy;

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_39__;

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_40__;

/***/ }
/******/ ])
});
;