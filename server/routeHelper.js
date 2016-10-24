var NotFoundError = require("../business_logic/shared/notFoundError");
var ConcurrencyError = require("../business_logic/shared/concurrencyError.js");
var _ = require('lodash');
var OK = 200;
var CREATED = 201;
var NO_CONTENT = 204;
var BAD_REQUEST = 400;
var NOT_FOUND = 404;
var CONFLICT = 409;

function createController(route, app, service) {

  addGetRouteHandler(app, `${route}`, function(request) {
    return service.getAllCommand();
  });

  addGetRouteHandler(app, `${route}/:id`, function(request) {
    return service.getByIdCommand(request.params.id);
  });

  addPostRouteHandler(app, `${route}`, function(request) {
    return service.insertCommand(request.body);
  });

  addPutRouteHandler(app, `${route}/:id`, function(request) {
    return service.updateCommand(request.body);
  });

  addDeleteRouteHandler(app, `${route}/:id`, function(request) {
    return service.destroyCommand(request.params.id);
  });
};

function addGetRouteHandler(app, route, commandFactory) {
  app.get(route, (req, res) => {
    var command = commandFactory(req);
    command.execute((err, result) => {
      if (err) {
        // LOG ERROR
        return res.status(BAD_REQUEST).json(err.message);
      }
      if (result.success) {
        if (result.value) {
          res.status(OK).json(result.value);
        } else {
          res.status(NOT_FOUND).end();
        }
      } else {
        res.status(BAD_REQUEST).json(result.errors);
      }
    });
  });
}

function addPostRouteHandler(app, route, commandFactory) {
  app.post(route, (req, res) => {
    var command = commandFactory(req);
    command.execute((err, result) => {
      if (err) {
        if (err instanceof NotFoundError) {
          return res.status(NOT_FOUND).json(err.message)
        }
        // LOG ERROR
        return res.status(BAD_REQUEST).json(err.message);
      }
      if (result.success) {
        res.status(CREATED).json(result.value);
      } else {
        res.status(BAD_REQUEST).json(result.errors);
      }
    });
  });
}

function addPutRouteHandler(app, route, commandFactory) {
  app.put(route, (req, res) => {
    req.body.id = req.params.id;
    var command = commandFactory(req);
    command.execute((err, result) => {
      if (err) {
        if (err instanceof NotFoundError) {
          return res.status(NOT_FOUND).json(err.message)
        }
        if (err instanceof ConcurrencyError) {
          return res.status(CONFLICT).json(err.message)
        }
        // LOG ERROR
        return res.status(BAD_REQUEST).json(err.message);
      }
      if (result.success) {
        res.status(OK).json(result.value);
      } else {
        res.status(BAD_REQUEST).json(result.errors);
      }
    });
  });
}

function addDeleteRouteHandler(app, route, commandFactory) {
  app.delete(route, (req, res) => {
    var command = commandFactory(req);
    command.execute((err, result) => {
      if (result.success) {
        res.status(NO_CONTENT).end();
      } else {
        res.status(BAD_REQUEST).json(result.errors);
      }
    });
  });
}

module.exports = {
  createController: createController,
  addGetRouteHandler: addGetRouteHandler,
  addPostRouteHandler: addPostRouteHandler,
  addPutRouteHandler: addPutRouteHandler,
  addDeleteRouteHandler: addDeleteRouteHandler
};
