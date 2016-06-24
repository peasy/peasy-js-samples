var Rule = require('peasy-js').Rule;

var FieldRequiredRule = Rule.extend({
  params: ['field', 'data'],
  functions: {
    _onValidate: function(done) {
      if (!this.data[this.field]) {
        this.association = this.field;
        this._invalidate(this.field + " is required");
      }
      done();
    }
  }
});

module.exports = FieldRequiredRule;
