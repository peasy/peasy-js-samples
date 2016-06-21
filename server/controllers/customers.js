var _ = require('lodash');

module.exports = function(app) {

  var customers = [{id: 1, name: 'aaron hanusa'}];

  // CREATE
  app.post('/customers', function(req, res) {
    customers.push(req.body);
    req.body.foo = "new";
    res.json(req.body);
  });

  // RETRIEVE
  app.get('/customers', (req, res) => {
    res.send(customers);
  });

  app.get('/customers/:id', (req, res) => {
    res.send(customers.filter(c => c.id === parseInt(req.params.id, 10))[0]);
  });

  // UPDATE
  app.put('/customers/:id', (req, res) => {
    var index = customers.findIndex(c => c.id === req.params.id);
    var customer = customers[index];
    var result = _.merge(customer, req.body);
    res.json(result);
  });

  // DELETE
  app.delete('/customers/:id', (req, res) => {
    console.log(typeof req.params.id);
    var index = customers.findIndex(c => c.id === req.params.id);
    customers.splice(index, 1);
    res.json("ok");
  });
};
