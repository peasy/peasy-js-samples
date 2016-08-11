describe("FieldLengthRule", function() {
  var FieldLengthRule = require('../../../business_logic/rules/fieldLengthRule');

  it("invalidates when the value exceeds length", () => {
    var rule = new FieldLengthRule("name", "hello", 4);
    rule.validate(() => {
      expect(rule.valid).toBe(false);
    });
  });

  it("invalidates with the expected association", () => {
    var rule = new FieldLengthRule("name", "hello", 4);
    rule.validate(() => {
      expect(rule.errors[0].association).toEqual("name");
    });
  });

  it("invalidates with the expected message", () => {
    var rule = new FieldLengthRule("name", "hello", 4);
    rule.validate(() => {
      expect(rule.errors[0].message).toEqual("name accepts a max length of 4");
    });
  });

  it("does not invalidate when the value equals length", () => {
    var rule = new FieldLengthRule("name", "hello", 5);
    rule.validate(() => {
      expect(rule.valid).toBe(false);
    });
  });

  it("does not invalidate when the value less than length", () => {
    var rule = new FieldLengthRule("name", "hello", 6);
    rule.validate(() => {
      expect(rule.valid).toBe(true);
    });
  });

});
