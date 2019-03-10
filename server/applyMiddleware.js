const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors')

const applyMiddleware = function(app) {

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
