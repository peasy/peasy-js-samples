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

var OK = 200;
var BAD_REQUEST = 400;
var NOT_FOUND = 404;

utils.createController('/customers', app, new CustomerService(new CustomerDataProxy()));
utils.createController('/categories', app, new CategoryService(new CategoryDataProxy()));
utils.addRouteHandler(() => {
  app.get('/products', (req, res) => {
    var service = new ProductService(new ProductDataProxy());
    var command = service.getAllCommand();
    if (req.query.categoryid) {
      command = service.getByCategoryCommand(req.query.categoryid);
    }
    command.execute((err, result) => {
      if (result.success) {
        if (result.value) {
          res.status(OK).json(result.value);
        } else {
          res.status(NOT_FOUND).send("");
        }
      } else {
        res.status(BAD_REQUEST).json(result.errors);
      }
    });
  });
});
utils.createController('/products', app, new ProductService(new ProductDataProxy()));


//app.get('/', function(req, res) {
  ////res.send('hello world');
  //res.json({'hi':'world'});
//});

var server = app.listen(3000, function() {
  console.log("server running ...");
});
