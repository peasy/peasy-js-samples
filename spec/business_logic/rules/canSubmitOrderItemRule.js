describe("CanSubmitOrderItemRule", function() {
  var CanSubmitOrderItemRule = require('../../../business_logic/rules/canSubmitOrderItemRule');

  it("does not invalidate pending order items", () => {
    var orderItem = {
      status: "PENDING"
    };
    var rule = new CanSubmitOrderItemRule(orderItem);
    rule.validate(() => {
      expect(rule.valid).toBe(true);
    });
  });

  it("invalidates everything else", () => {
    var orderItem = {
      status: "SHIPPED"
    };
    var rule = new CanSubmitOrderItemRule(orderItem);
    rule.validate(() => {
      expect(rule.valid).toBe(false);
    });
  });

});
