describe("CanDeleteProductRule", function() {
  var CanDeleteProductRule = require('../../../business_logic/rules/canDeleteProductRule');

  it("invalidates products associated with one or more orders", () => {
    var productId = 1;
    var orderService = {
      getByProductCommand: function(prodId) {
        return {
          execute: function(done) {
            done(null, { value: [{orderId: 1}] });
          }
        }
      }
    };
    var rule = new CanDeleteProductRule(productId, orderService);
    rule.validate(() => {
      expect(rule.valid).toBe(false);
    });
  });

  it("does not invalidate products without associated orders", () => {
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

  it("does not invalidate products without associated orders (empty array) ", () => {
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

  it("exits with an error if an error is received", () => {
    var productId = 1;
    var orderService = {
      getByProductCommand: function(prodId) {
        return {
          execute: function(done) {
            done(new Error());
          }
        }
      }
    };
    var rule = new CanDeleteProductRule(productId, orderService);
    rule.validate((err) => {
      expect(err).not.toBeNull();
    });
  });
});
