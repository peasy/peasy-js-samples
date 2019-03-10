const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors')
// var webpack = require('webpack');
// var config = require('../webpack.config.dev');
// var compiler = webpack(config);

const applyMiddleware = function(app) {
  // MIDDLEWARE
  // app.use(require('webpack-dev-middleware')(compiler, {
  //   noInfo: true,
  //   publicPath: config.output.publicPath
  // }));

  // app.use(require('webpack-hot-middleware')(compiler));
  app.use(lowerCaseQueryParams);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

	app.use(express.static('dist'));
	app.use(express.static('dist/angular'));
	app.use(express.static('dist/react'));
	app.use(cors());
};

function lowerCaseQueryParams(req, res, next) {
  for (var key in req.query) {
    req.query[key.toLowerCase()] = req.query[key];
  }
  next();
}

module.exports = applyMiddleware;
