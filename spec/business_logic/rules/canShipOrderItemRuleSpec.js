describe("CanShipOrderItemRule", function() {
  var CanShipOrderItemRule = require('../../../business_logic/rules/canShipOrderItemRule');

  it("does not invalidate submitted order items", () => {
    var orderItem = {
      status: "SUBMITTED"
    };
    var rule = new CanShipOrderItemRule(orderItem);
    rule.validate(() => {
      expect(rule.valid).toBe(true);
    });
  });

  it("does not invalidate backordered order items", () => {
    var orderItem = {
      status: "BACKORDERED"
    };
    var rule = new CanShipOrderItemRule(orderItem);
    rule.validate(() => {
      expect(rule.valid).toBe(true);
    });
  });

  it("invalidates everything else", () => {
    var orderItem = {
      status: "PENDING"
    };
    var rule = new CanShipOrderItemRule(orderItem);
    rule.validate(() => {
      expect(rule.valid).toBe(false);
    });
  });

});
