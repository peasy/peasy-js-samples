var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var utils = require('./utils');
var InMemoryDataProxy = require('../data_proxies/in-memory/InMemoryDataProxy.js');
var CustomerDataProxy = require('../data_proxies/mongo/customerDataProxy');
var CustomerService = require('../business_logic/services/customerService');
var CategoryDataProxy = require('../data_proxies/mongo/categoryDataProxy');
var CategoryService = require('../business_logic/services/categoryService');
var ProductDataProxy = require('../data_proxies/mongo/productDataProxy');
var ProductService = require('../business_logic/services/productService');

// MIDDLEWARE
app.use(function(req, res, next) {
  for (var key in req.query) {
    req.query[key.toLowerCase()] = req.query[key];
  }
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

utils.createController('/customers', app, new CustomerService(new CustomerDataProxy()));
utils.createController('/categories', app, new CategoryService(new CategoryDataProxy()));
utils.addGetRouteHandler(app, '/products', function(request) {
  var service = new ProductService(new ProductDataProxy());
  var command = service.getAllCommand();
  if (request.query.categoryid) {
    command = service.getByCategoryCommand(request.query.categoryid);
  }
  return command;
});
utils.createController('/products', app, new ProductService(new ProductDataProxy()));


//app.get('/', function(req, res) {
  ////res.send('hello world');
  //res.json({'hi':'world'});
//});

var server = app.listen(3000, function() {
  console.log("server running ...");
});
