var Rule = require('peasy-js').Rule;

var CanDeleteCategoryRule = Rule.extend({
  params: ['categoryId', 'productService'],
  functions: {
    _onValidate: function(categoryId, productService, done) {
      var self = this;
      productService.getByCategoryCommand(categoryId).execute(function(err, result) {
        if (err) { return done(err); }
        if (result.value && result.value.length > 0) {
          self._invalidate("This category is associated with one or more products and cannot be deleted");
        }
        done();
      });
    }
  }
});

module.exports = CanDeleteCategoryRule;
