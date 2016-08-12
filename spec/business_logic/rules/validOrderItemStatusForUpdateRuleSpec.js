describe("ValidOrderItemStatusForUpdateRule", function() {
  var ValidOrderItemStatusForUpdateRule = require('../../../business_logic/rules/validOrderItemStatusForUpdateRule');

  it("invalidates when order item's status is shipped", () => {
    var orderItem = { amount: 102, quantity: 5, price: 10, status: "SHIPPED" };
    var rule = new ValidOrderItemStatusForUpdateRule(orderItem);
    rule.validate(() => {
      expect(rule.valid).toBe(false);
      expect(rule.errors[0].message).toEqual("Shipped items cannot be changed");
    });
  });

  it("invalidates when order item's status is shipped", () => {
    var orderItem = { amount: 102, quantity: 5, price: 10, status: "BACKORDERED" };
    var rule = new ValidOrderItemStatusForUpdateRule(orderItem);
    rule.validate(() => {
      expect(rule.valid).toBe(false);
      expect(rule.errors[0].message).toEqual("Backordered items cannot be changed");
    });
  });

  it("validates when order item's status is anything else", () => {
    var orderItem = { amount: 102, quantity: 5, price: 10, status: "PENDING" };
    var rule = new ValidOrderItemStatusForUpdateRule(orderItem);
    rule.validate(() => {
      expect(rule.valid).toBe(true);
    });
  });


});
