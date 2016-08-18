var bodyParser = require('body-parser');

var applyMiddleware = function(app) {
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
};

module.exports = applyMiddleware;
