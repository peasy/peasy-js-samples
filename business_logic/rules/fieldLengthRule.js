var Rule = require('peasy-js').Rule;

var FieldLengthRule = Rule.extend({
  params: ['field', 'value', 'length'],
  functions: {
    _onValidate: function(done) {
      if (this.value && this.value.length > this.length) {
        this.association = this.field;
        this._invalidate(this.field + " accepts a max length of " + this.length);
      }
      done();
    }
  }
});

module.exports = FieldLengthRule;
