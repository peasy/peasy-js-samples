
var InMemoryDataProxy = require('../../data_proxies/in-memory/InMemoryDataProxy');
var CustomerService = require('../../business_logic/services/customerService');

module.exports = function(route, app, service) {

  var OK = 200;
  var CREATED = 201;
  var NO_CONTENT = 204;
  var BAD_REQUEST = 400;

  // GET
  app.get(`${route}`, (req, res) => {
    var command = service.getAllCommand();
    command.execute((err, result) => {
      if (result.success) {
        res.status(OK).json(result.value);
      } else {
        res.status(BAD_REQUEST).json(result.errors);
      }
    });
  });

  app.get(`${route}/:id`, (req, res) => {
    var id = parseInt(req.params.id, 10);
    var command = service.getByIdCommand(id);
    command.execute((err, result) => {
      if (result.success) {
        res.status(OK).json(result.value);
      } else {
        res.status(BAD_REQUEST).json(result.errors);
      }
    });
  });

  // POST
  app.post(`${route}`, function(req, res) {
    var command = service.insertCommand(req.body);
    command.execute((err, result) => {
      if (result.success) {
        res.status(CREATED).json(result.value);
      } else {
        res.status(BAD_REQUEST).json(result.errors);
      }
    });
  });

  // PUT
  app.put(`${route}/:id`, (req, res) => {
    var customer = req.body;
    customer.id = parseInt(req.params.id, 10);
    var command = service.updateCommand(customer);
    command.execute((err, result) => {
      if (result.success) {
        res.status(OK).json(result.value);
      } else {
        res.status(BAD_REQUEST).json(result.errors);
      }
    });
  });

  // DELETE
  app.delete(`${route}/:id`, (req, res) => {
    var id = parseInt(req.params.id, 10);
    var command = service.destroyCommand(id);
    command.execute((err, result) => {
      if (result.success) {
        res.status(NO_CONTENT).send("");
      } else {
        res.status(BAD_REQUEST).json(result.errors);
      }
    });
  });

};
