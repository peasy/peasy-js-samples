describe("BaseService", function() {
  var BaseService = require('../../../business_logic/services/baseService');
  var NotFoundError = require('../../../business_logic/shared/notFoundError');

  describe("updateCommand", () => {
    describe("update override", () => {
      describe("obtains the current version of the object from data proxy", () => {
        describe("on item found", () => {
          var dataProxy = {
            getById: function(id, done) {
              done(null, { name: "Frank Zappa", address: "123 Main St.", active: true, prime: true });
            },
            update: function(data, done) {
              done(null, {});
            }
          };
          it("invokes the data proxy update method with expected results", () => {
            spyOn(dataProxy, 'update').and.callThrough();
            var expectedResult = {
              name: "Frank Zappa",
              address: "456 First St.",
              active: false,
              prime: true
            };
            var service = new BaseService(dataProxy);
            service.updateCommand({active: false, address: "456 First St."}).execute((err, result) => {
              expect(dataProxy.update).toHaveBeenCalledWith(expectedResult, jasmine.any(Function));
            });
          });
        });
        describe("on item not found", () => {
          it("returns a not found error", () => {
            var dataProxy = {
              getById: function(id, done) {
                done(null, null);
              }
            };
            var service = new BaseService(dataProxy);
            service.updateCommand({id: 3}).execute((err, result) => {
              expect(err instanceof NotFoundError).toBe(true);
            });
          });
        });
      });
    });

  });

});
