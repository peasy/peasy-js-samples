var _ = require('lodash');
var InMemoryDataProxy = require('../../data_proxies/in-memory/InMemoryDataProxy');

module.exports = function(app) {

  var customers = new InMemoryDataProxy();

  // CREATE
  app.post('/customers', function(req, res) {
    customers.insert(req.body, function(err, customer) {
      res.json(customer);
    });
  });

  // RETRIEVE
  app.get('/customers', (req, res) => {
    customers.getAll((err, result) => {
      res.send(result);
    });
  });

  app.get('/customers/:id', (req, res) => {
    var id = parseInt(req.params.id, 10);
    customers.getById(id, (err, customer) => {
      res.send(customer);
    });
  });

  // UPDATE
  app.put('/customers/:id', (req, res) => {
    var id = parseInt(req.params.id, 10);
    customers.getById(id, (err, customer) => {
      _.merge(customer, req.body);
      customers.update(customer, (err, result) => {
        res.json(result);
      });
    });
  });

  // DELETE
  app.delete('/customers/:id', (req, res) => {
    customers.destroy(req.params.id, (err) => {
      res.json("ok");
    });
  });
};
