describe("ValidOrderItemStatusForDeleteRule", function() {
  var ValidOrderItemStatusForDeleteRule = require('../../../business_logic/rules/validOrderItemStatusForDeleteRule');

  it("invalidates when order item's status is shipped", () => {
    var orderItem = { amount: 102, quantity: 5, price: 10, status: "SHIPPED" };
    var rule = new ValidOrderItemStatusForDeleteRule(orderItem);
    rule.validate(() => {
      expect(rule.valid).toBe(false);
    });
  });

  it("validates when order item's status is anything else", () => {
    var orderItem = { amount: 101, quantity: 5, price: 20.2, status: "PENDING" };
    var rule = new ValidOrderItemStatusForDeleteRule(orderItem);
    rule.validate(() => {
      expect(rule.valid).toBe(true);
    });
  });


});
