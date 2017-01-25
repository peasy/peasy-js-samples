describe("FieldTypeRule", function() {
  var FieldTypeRule = require('../../../business_logic/rules/fieldTypeRule');

  it("invalidates with the expected association", () => {
    var rule = new FieldTypeRule("name", 5, "string");
    rule.validate(() => {
      expect(rule.errors[0].association).toEqual("name");
    });
  });

  it("invalidates with the expected message", () => {
    var rule = new FieldTypeRule("name", 5, "string");
    rule.validate(() => {
      expect(rule.errors[0].message).toEqual("Invalid type supplied for name, expected string");
    });
  });

  it("does not invalidate when a value is supplied", () => {
    var rule = new FieldTypeRule("name", "5", "string");
    rule.validate(() => {
      expect(rule.valid).toBe(true);
    });
  });
});
