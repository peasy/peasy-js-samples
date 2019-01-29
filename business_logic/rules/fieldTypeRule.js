var Rule = require('peasy-js').Rule;

var FieldTypeRule = Rule.extend({
  params: ['field', 'value', 'type'],
  functions: {
    _onValidate: function(field, value, type, done) {
      // if (isNaN(this.value)) { this.value = null; }
      if (this.value && typeof this.value !== this.type) {
        this.association = this.field;
        this._invalidate(`Invalid type supplied for ${this.field}, expected ${this.type}`);
      }
      done();
    }
  }
});

module.exports = FieldTypeRule;
