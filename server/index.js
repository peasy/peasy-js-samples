var express = require('express');
var app = express();
var applySettings = require('./applySettings');
var applyMiddleware = require('./applyMiddleware');
var wireUpRoutes = require('./wireUpRoutes');
var open = require('open');

applySettings(app);
applyMiddleware(app);
wireUpRoutes(app);

var port = 3000;

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("server running ...");
    open(`http://localhost:${port}/`);
  }
});
