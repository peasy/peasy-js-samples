describe("OrderItemAmountValidityRule", function() {
  var OrderItemAmountValidityRule = require('../../../business_logic/rules/orderItemAmountValidityRule');

  it("invalidates when order item's amount does not equal product price * order items's quantity", () => {
    var orderItem = { amount: 102, quantity: 5 };
    var product = { price: 20.2 };
    var rule = new OrderItemAmountValidityRule(orderItem, product);
    rule.validate(() => {
      expect(rule.valid).toBe(false);
    });
  });

  it("validates when order item's amount equals product price * order items's quantity", () => {
    var orderItem = { amount: 101, quantity: 5 };
    var product = { price: 20.2 };
    var rule = new OrderItemAmountValidityRule(orderItem, product);
    rule.validate(() => {
      expect(rule.valid).toBe(true);
    });
  });


});
