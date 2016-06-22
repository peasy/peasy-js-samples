var InMemoryDataProxy = require('../../data_proxies/in-memory/InMemoryDataProxy');
var CustomerService = require('../../business_logic/services/customerService');

module.exports = function(app) {

  var dataProxy = new InMemoryDataProxy();
  var customerService = new CustomerService(dataProxy);
  var OK = 200;
  var CREATED = 201;
  var NO_CONTENT = 204;

  // CREATE
  app.post('/customers', function(req, res) {
    var command = customerService.insertCommand(req.body);
    command.execute((err, result) => {
      res.status(CREATED).json(result.value);
    });
  });

  // RETRIEVE
  app.get('/customers', (req, res) => {
    var command = customerService.getAllCommand();
    command.execute((err, result) => {
      res.status(OK).json(result.value);
    });
  });

  app.get('/customers/:id', (req, res) => {
    var id = parseInt(req.params.id, 10);
    var command = customerService.getByIdCommand(id);
    command.execute((err, result) => {
      res.status(OK).json(result.value);
    });
  });

  // UPDATE
  app.put('/customers/:id', (req, res) => {
    var customer = req.body;
    customer.id = parseInt(req.params.id, 10);
    var command = customerService.updateCommand(customer);
    command.execute((err, result) => {
      res.status(OK).json(result.value);
    });
  });

  // DELETE
  app.delete('/customers/:id', (req, res) => {
    var id = parseInt(req.params.id, 10);
    var command = customerService.destroyCommand(id);
    command.execute((err, result) => {
      res.status(NO_CONTENT).send("");
    });
  });
};
