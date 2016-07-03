var ConcurrencyError = function(message) {
  this.message = message;
}

ConcurrencyError.prototype = new Error();

module.exports = ConcurrencyError;
