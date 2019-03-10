const peasyConfig = require('peasy-js').Configuration;

var applySettings = function(app) {
	peasyConfig.autoPromiseWrap = true;
};

module.exports = applySettings;
