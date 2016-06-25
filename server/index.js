var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var InMemoryDataProxy = require('../data_proxies/in-memory/InMemoryDataProxy.js');
var CustomerDataProxy = require('../data_proxies/mongo/customerDataProxy');
var CustomerService = require('../business_logic/services/customerService');
var CategoryDataProxy = require('../data_proxies/mongo/categoryDataProxy');
var CategoryService = require('../business_logic/services/categoryService');
var ProductDataProxy = require('../data_proxies/mongo/productDataProxy');
var ProductService = require('../business_logic/services/productService');
var createController = require('./controllers/createController');

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

createController('/customers', app, new CustomerService(new CustomerDataProxy()));
createController('/categories', app, new CategoryService(new CategoryDataProxy()));
createController('/products', app, new ProductService(new ProductDataProxy()));

app.get('/customers/:id/addresses', function(req, res) {
  res.json({'hi':req.params.id});
});

app.get('/inventoryItems?:productId', function(req, res) {
  res.json({'items':req.query.productid});
});

//app.get('/', function(req, res) {
  ////res.send('hello world');
  //res.json({'hi':'world'});
//});

var server = app.listen(3000, function() {
  console.log("server running ...");
});
