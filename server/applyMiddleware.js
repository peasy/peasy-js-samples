var bodyParser = require('body-parser');
var express = require('express');
var webpack = require('webpack');
var config = require('../webpack.config.dev');
var compiler = webpack(config);

var applyMiddleware = function(app) {
  // MIDDLEWARE
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
  app.use(lowerCaseQueryParams);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(express.static('public'));
  app.use(express.static('node_modules'));
  app.use(express.static('client'));
};

function lowerCaseQueryParams(req, res, next) {
  for (var key in req.query) {
    req.query[key.toLowerCase()] = req.query[key];
  }
  next();
}

module.exports = applyMiddleware;
