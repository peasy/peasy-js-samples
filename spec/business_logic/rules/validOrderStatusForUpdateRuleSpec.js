describe("ValidOrderStatusForUpdateRule", function() {
  var ValidOrderStatusForUpdateRule = require('../../../business_logic/rules/validOrderStatusForUpdateRule');

  it("invalidates when order contains one or more shipped items", () => {
    var orderId = 1;
    var orderItemService = {
      getByOrderCommand: function(orderId) {
        return {
          execute: function(done) {
            done(null, {
              value: [
                { id: 1, status: "SHIPPED" },
                { id: 2, status: "PENDING" }
              ]
            });
          }
        }
      }
    };
    var rule = new ValidOrderStatusForUpdateRule(orderId, orderItemService);
    rule.validate(() => {
      expect(rule.valid).toBe(false);
    });
  });

  it("validates when order item's status is anything else", () => {
    var orderId = 1;
    var orderItemService = {
      getByOrderCommand: function(orderId) {
        return {
          execute: function(done) {
            done(null, {
              value: [
                { id: 1, status: "BACKORDERED" },
                { id: 2, status: "PENDING" }
              ]
            });
          }
        }
      }
    };
    var rule = new ValidOrderStatusForUpdateRule(orderId, orderItemService);
    rule.validate(() => {
      expect(rule.valid).toBe(true);
    });
  });


});
