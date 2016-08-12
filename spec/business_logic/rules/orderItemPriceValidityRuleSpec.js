describe("OrderItemPriceValidityRule", function() {
  var OrderItemPriceValidityRule = require('../../../business_logic/rules/orderItemPriceValidityRule');

  it("invalidates when order item's price does not equal product price", () => {
    var orderItem = { amount: 102, quantity: 5, price: 10 };
    var product = { price: 20.2 };
    var rule = new OrderItemPriceValidityRule(orderItem, product);
    rule.validate(() => {
      expect(rule.valid).toBe(false);
    });
  });

  it("validates when order item's price equals product price", () => {
    var orderItem = { amount: 101, quantity: 5, price: 20.2 };
    var product = { price: 20.2 };
    var rule = new OrderItemPriceValidityRule(orderItem, product);
    rule.validate(() => {
      expect(rule.valid).toBe(true);
    });
  });


});
