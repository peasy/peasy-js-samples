describe("FieldRequiredRule", function() {
  var FieldRequiredRule = require('../../../business_logic/rules/fieldRequiredRule');

  it("invalidates as expected", () => {
    var rule = new FieldRequiredRule("name", { name: "" });
    rule.validate(() => {
      expect(rule.valid).toBe(false);
    });
  });

  it("invalidates with the expected association", () => {
    var rule = new FieldRequiredRule("name");
    rule.validate(() => {
      expect(rule.errors[0].association).toEqual("name");
    });
  });

  it("invalidates with the expected message", () => {
    var rule = new FieldRequiredRule("name", {});
    rule.validate(() => {
      expect(rule.errors[0].message).toEqual("name is required");
    });
  });

  it("does not invalidate when a value is supplied", () => {
    var rule = new FieldRequiredRule("name", { name: "Jimi Hendrix" });
    rule.validate(() => {
      expect(rule.valid).toBe(true);
    });
  });
});
