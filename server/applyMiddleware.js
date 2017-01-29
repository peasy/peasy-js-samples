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
  app.use(convertQueryStringIdsToNumbers)
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(express.static('public'));
  app.use(express.static('node_modules'));
};

function lowerCaseQueryParams(req, res, next) {
  for (var key in req.query) {
    req.query[key.toLowerCase()] = req.query[key];
  }
  next();
}

function convertQueryStringIdsToNumbers(req, res, next) {
  for (var key in req.query) {
    if (key.substring(key.length - 2) === "id") {
      req.query[key] = parseInt(req.query[key]);
    }
  }
  next();
}

module.exports = applyMiddleware;
