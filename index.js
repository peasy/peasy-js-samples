var express = require('express');
var app = express();
var applySettings = require('./applySettings');
var applyMiddleware = require('./applyMiddleware');
var wireUpRoutes = require('./wireUpRoutes');

applySettings(app);
applyMiddleware(app);
wireUpRoutes(app);

var server = app.listen(3000, function() {
  console.log("server running ...");
});
