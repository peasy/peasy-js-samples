(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("peasy-js"), require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["peasy-js", "lodash"], factory);
	else if(typeof exports === 'object')
		exports["ordersDotCom"] = factory(require("peasy-js"), require("lodash"));
	else
		root["ordersDotCom"] = factory(root["peasy"], root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__) {
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

	var ordersDotCom = {
	  services: {
	    CategoryService: CategoryService,
	    CustomerService: CustomerService,
	    InventoryItemService: InventoryItemService,
	    OrderItemService: OrderItemService,
	    OrderService: OrderService,
	    ProductService: ProductService
	  }
	};

	module.exports = ordersDotCom;

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

/***/ }
/******/ ])
});
;