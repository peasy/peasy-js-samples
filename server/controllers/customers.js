var InMemoryDataProxy = require('../../data_proxies/in-memory/InMemoryDataProxy');
var CustomerService = require('../../business_logic/services/customerService');

module.exports = function(app) {

  var dataProxy = new InMemoryDataProxy();
  var customerService = new CustomerService(dataProxy);
  var OK = 200;
  var CREATED = 201;
  var NO_CONTENT = 204;
  var BAD_REQUEST = 400;

  // GET
  app.get('/customers', (req, res) => {
    var command = customerService.getAllCommand();
    command.execute((err, result) => {
      if (result.success) {
        res.status(OK).json(result.value);
      } else {
        res.status(BAD_REQUEST).json(result.errors);
      }
    });
  });

  app.get('/customers/:id', (req, res) => {
    var id = parseInt(req.params.id, 10);
    var command = customerService.getByIdCommand(id);
    command.execute((err, result) => {
      if (result.success) {
        res.status(OK).json(result.value);
      } else {
        res.status(BAD_REQUEST).json(result.errors);
      }
    });
  });

  // POST
  app.post('/customers', function(req, res) {
    var command = customerService.insertCommand(req.body);
    command.execute((err, result) => {
      if (result.success) {
        res.status(CREATED).json(result.value);
      } else {
        res.status(BAD_REQUEST).json(result.errors);
      }
    });
  });

  // PUT
  app.put('/customers/:id', (req, res) => {
    var customer = req.body;
    customer.id = parseInt(req.params.id, 10);
    var command = customerService.updateCommand(customer);
    command.execute((err, result) => {
      if (result.success) {
        res.status(OK).json(result.value);
      } else {
        res.status(BAD_REQUEST).json(result.errors);
      }
    });
  });

  // DELETE
  app.delete('/customers/:id', (req, res) => {
    var id = parseInt(req.params.id, 10);
    var command = customerService.destroyCommand(id);
    command.execute((err, result) => {
      if (result.success) {
        res.status(NO_CONTENT).send("");
      } else {
        res.status(BAD_REQUEST).json(result.errors);
      }
    });
  });
};
