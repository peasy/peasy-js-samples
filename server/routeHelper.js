var NotFoundError = require("../business_logic/shared/notFoundError");
var ConcurrencyError = require("../business_logic/shared/concurrencyError.js");
var _ = require('lodash');
var OK = 200;
var CREATED = 201;
var NO_CONTENT = 204;
var BAD_REQUEST = 400;
var NOT_FOUND = 404;
var CONFLICT = 409;

function createController(route, app, service, io) {

  addGetRouteHandler(app, `${route}`, function(request) {
    return service.getAllCommand();
  });

  addGetRouteHandler(app, `${route}/:id`, function(request) {
    return service.getByIdCommand(request.params.id);
  });

  addPostRouteHandler(app, `${route}`, function(request) {
    return service.insertCommand(request.body);
  }, io);

  addPutRouteHandler(app, `${route}/:id`, function(request) {
    return service.updateCommand(request.body);
  }, io);

  addDeleteRouteHandler(app, `${route}/:id`, function(request) {
    return service.destroyCommand(request.params.id);
  }, io);
};

function addGetRouteHandler(app, route, commandFactory) {
  app.get(route, (req, res) => {
    if (req.params.id) {
      if (!req.params.id) return res.status(NOT_FOUND).end();
    }
    var command = commandFactory(req);
    command.execute((err, result) => {
      if (err) {
        // LOG ERROR
        return res.status(BAD_REQUEST).json(err.message);
      }
      if (result.success) {
        if (result.value && notEmptyArray(result.value)) {
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

function addPostRouteHandler(app, route, commandFactory, io, actionType) {
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
        if (io) io.emit('test', {
          type: actionType || 'insert',
          route: route.split('/')[1],
          data: result.value
        });
        res.status(CREATED).json(result.value);
      } else {
        res.status(BAD_REQUEST).json(result.errors);
      }
    });
  });
}

function addPutRouteHandler(app, route, commandFactory, io) {
  app.put(route, (req, res) => {
    if (!req.params.id) return res.status(NOT_FOUND).end();
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
        if (io) io.emit('test', {
          type: 'update',
          route: route.split('/')[1],
          data: result.value
        });
        res.status(OK).json(result.value);
      } else {
        res.status(BAD_REQUEST).json(result.errors);
      }
    });
  });
}

function addDeleteRouteHandler(app, route, commandFactory, io) {
  app.delete(route, (req, res) => {
    if (!req.params.id) return res.status(NOT_FOUND).end();
    var command = commandFactory(req);
    command.execute((err, result) => {
      if (result.success) {
        if (io) io.emit('test', {
          type: 'delete',
          route: route.split('/')[1],
          data: { id: eq.params.id }
        });
        res.status(NO_CONTENT).end();
      } else {
        res.status(BAD_REQUEST).json(result.errors);
      }
    });
  });
}

function notEmptyArray(value) {
  if (!Array.isArray(value)) return true;
  return value.length > 0;
}

module.exports = {
  createController: createController,
  addGetRouteHandler: addGetRouteHandler,
  addPostRouteHandler: addPostRouteHandler,
  addPutRouteHandler: addPutRouteHandler,
  addDeleteRouteHandler: addDeleteRouteHandler
};
