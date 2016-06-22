var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var InMemoryDataProxy = require('../data_proxies/in-memory/InMemoryDataProxy.js');
var CustomerService = require('../business_logic/services/customerService');
var createController = require('./controllers/createController');

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//var customers = require('./controllers/customers.js')(app);
var service = new CustomerService(new InMemoryDataProxy());
createController('/customers', app, service);

//app.get('/', function(req, res) {
  ////res.send('hello world');
  //res.json({'hi':'world'});
//});

var server = app.listen(3000, function() {
  console.log("server running ...");
});
