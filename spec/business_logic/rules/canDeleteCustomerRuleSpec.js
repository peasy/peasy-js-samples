describe("CanDeleteCustomerRule", function() {
  var CanDeleteCustomerRule = require('../../../business_logic/rules/canDeleteCustomerRule');

  it("invalidates customers associated with one or more orders", () => {
    var customerId = 1;
    var orderService = {
      getByCustomerCommand: function(customerId) {
        return {
          execute: function(done) {
            done(null, { value: [{orderId: 1}] });
          }
        }
      }
    };
    var rule = new CanDeleteCustomerRule(customerId, orderService);
    rule.validate(() => {
      expect(rule.valid).toBe(false);
    });
  });

  it("does not invalidate customers without associated orders", () => {
    var customerId = 1;
    var orderService = {
      getByCustomerCommand: function(customerId) {
        return {
          execute: function(done) {
            done(null, { value: null });
          }
        }
      }
    };
    var rule = new CanDeleteCustomerRule(customerId, orderService);
    rule.validate(() => {
      expect(rule.valid).toBe(true);
    });
  });

  it("does not invalidate customers without associated orders (empty array) ", () => {
    var customerId = 1;
    var orderService = {
      getByCustomerCommand: function(customerId) {
        return {
          execute: function(done) {
            done(null, { value: [] });
          }
        }
      }
    };
    var rule = new CanDeleteCustomerRule(customerId, orderService);
    rule.validate(() => {
      expect(rule.valid).toBe(true);
    });
  });

  it("exits with an error if an error is received", () => {
    var customerId = 1;
    var orderService = {
      getByCustomerCommand: function(customerId) {
        return {
          execute: function(done) {
            done(new Error());
          }
        }
      }
    };
    var rule = new CanDeleteCustomerRule(customerId, orderService);
    rule.validate((err) => {
      expect(err).not.toBeNull();
    });
  });
});
