describe("CanDeleteCategoryRule", function() {
  var CanDeleteCategoryRule = require('../../../business_logic/rules/canDeleteCategoryRule');

  it("invalidates categories associated with one or more products", () => {
    var categoryId = 1;
    var productService = {
      getByCategoryCommand: function(categoryId) {
        return {
          execute: function(done) {
            done(null, { value: [{productId: 1}] });
          }
        }
      }
    };
    var rule = new CanDeleteCategoryRule(categoryId, productService);
    rule.validate(() => {
      expect(rule.valid).toBe(false);
    });
  });

  it("does not invalidate categories without associated products", () => {
    var categoryId = 1;
    var productService = {
      getByCategoryCommand: function(categoryId) {
        return {
          execute: function(done) {
            done(null, { value: null });
          }
        }
      }
    };
    var rule = new CanDeleteCategoryRule(categoryId, productService);
    rule.validate(() => {
      expect(rule.valid).toBe(true);
    });
  });

  it("does not invalidate categories without associated products (empty array) ", () => {
    var categoryId = 1;
    var productService = {
      getByCategoryCommand: function(categoryId) {
        return {
          execute: function(done) {
            done(null, { value: [] });
          }
        }
      }
    };
    var rule = new CanDeleteCategoryRule(categoryId, productService);
    rule.validate(() => {
      expect(rule.valid).toBe(true);
    });
  });

  it("exits with an error if an error is received", () => {
    var categoryId = 1;
    var productService = {
      getByCategoryCommand: function(categoryId) {
        return {
          execute: function(done) {
            done(new Error());
          }
        }
      }
    };
    var rule = new CanDeleteCategoryRule(categoryId, productService);
    rule.validate((err) => {
      expect(err).not.toBeNull();
    });
  });
});
