var Rule = require('peasy-js').Rule;

var CanDeleteCategoryRule = Rule.extend({
  params: ['categoryId', 'productService'],
  functions: {
    _onValidate: function(done) {
      this.productService.getByCategoryCommand(this.categoryId).execute(function(err, result) {
        if (err) { return done(err); }
        if (result.value) {
          this._invalidate("This category is associated with one or more products and cannot be deleted");
        }
        done();
      });
    }
  }
});

module.exports = CanDeleteCategoryRule;
