var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var InMemoryDataProxy = require('../data_proxies/in-memory/InMemoryDataProxy.js');
var CustomerDataProxy = require('../data_proxies/mongo/customerDataProxy');
var CustomerService = require('../business_logic/services/customerService');
var CategoryDataProxy = require('../data_proxies/mongo/categoryDataProxy');
var CategoryService = require('../business_logic/services/categoryService');
var createController = require('./controllers/createController');

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

createController('/customers', app, new CustomerService(new CustomerDataProxy()));
createController('/categories', app, new CategoryService(new CategoryDataProxy()));

//app.get('/', function(req, res) {
  ////res.send('hello world');
  //res.json({'hi':'world'});
//});

var server = app.listen(3000, function() {
  console.log("server running ...");
});
