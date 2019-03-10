// const path = require('path');
const peasyConfig = require('peasy-js').Configuration;

var applySettings = function(app) {
	peasyConfig.autoPromiseWrap = true;
  // app.set('x-powered-by', false);
  // app.set('views', path.join(__dirname, 'views'));
  // app.set('view engine', 'ejs');
};

module.exports = applySettings;
