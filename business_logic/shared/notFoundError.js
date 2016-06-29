var NotFoundError = function(message) {
  this.message = message;
}

NotFoundError.prototype = new Error();

module.exports = NotFoundError;
