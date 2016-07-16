describe("CanDeleteProductRule", function() {
  var CanDeleteProductRule = require('../../../business_logic/rules/canDeleteProductRule');

  it("invalidates products associated with one or more orders", () => {
    var productId = 1;
    var orderService = {
      getByProductCommand: function(prodId) {
        return {
          execute: function(done) {
            done(null, { value: ['red'] });
          }
        }
      }
    };
    var rule = new CanDeleteProductRule(productId, orderService);
    rule.validate(() => {
      expect(rule.valid).toBe(false);
    });
  });

  it("does not invalidate products associated with no association with orders", () => {
    var productId = 1;
    var orderService = {
      getByProductCommand: function(prodId) {
        return {
          execute: function(done) {
            done(null, { value: null});
          }
        }
      }
    };
    var rule = new CanDeleteProductRule(productId, orderService);
    rule.validate(() => {
      expect(rule.valid).toBe(true);
    });
  });

  it("does not invalidate products associated with no association with orders (empty array) ", () => {
    var productId = 1;
    var orderService = {
      getByProductCommand: function(prodId) {
        return {
          execute: function(done) {
            done(null, { value: []});
          }
        }
      }
    };
    var rule = new CanDeleteProductRule(productId, orderService);
    rule.validate(() => {
      expect(rule.valid).toBe(true);
    });
  });
});
