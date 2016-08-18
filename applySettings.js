var path = require('path');

var applySettings = function(app) {
  app.set('x-powered-by', false);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
};

module.exports = applySettings;
