var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var customers = require('./controllers/customers.js')(app);

app.get('/', function(req, res) {
  //res.send('hello world');
  res.json({'hi':'world'});
});

var server = app.listen(3000, function() {
  console.log("server running ...");
});
