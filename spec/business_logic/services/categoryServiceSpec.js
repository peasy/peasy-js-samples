describe("CategoryService", function() {
  var CategoryService = require('../../../business_logic/services/categoryService');
  var dataProxy, category;

  describe("insertCommand", () => {

    beforeEach(() => {
      dataProxy = {
        insert: function(data, done) {
          data.id = 1;
          done(null, data);
        }
      };
    });

    describe("initialization", () => {
      beforeEach(() => {
        category = {
          foo: "hey",
          name: "books",
          parentId: 4,
          isAdmin: true
        };
      });
      it("allows only whitelisted object members", () => {
        spyOn(dataProxy, "insert").and.callThrough();
        var expectedResult = {
          id: 1,
          name: "books",
          parentId: 4
        };
        var service = new CategoryService(dataProxy);
        service.insertCommand(category).execute((err, result) => {
          expect(dataProxy.insert).toHaveBeenCalledWith(expectedResult, jasmine.any(Function));
        });
      });
    });

    describe("rule execution", () => {
      describe("name", () => {
        it("is required", () => {
          var service = new CategoryService(dataProxy);
          service.insertCommand({}).execute((err, result) => {
            expect(result.errors.length).toEqual(1);
          });
        });
      });
    });
  });

  describe("updateCommand", () => {

    beforeEach(() => {
      dataProxy = {
        getById: function(id, done) {
          done(null, {});
        },
        update: function(data, done) {
          done(null, {});
        }
      };
    });

    describe("initialization", () => {

      beforeEach(() => {
        category = {
          id: 1,
          foo: "hey",
          name: "books",
          parentId: 4,
          isAdmin: true
        };
      });

      it("allows only whitelisted object members", () => {
        spyOn(dataProxy, "update").and.callThrough();
        var expectedResult = {
          id: 1,
          name: "books",
          parentId: 4
        };
        var service = new CategoryService(dataProxy);
        service.updateCommand(category).execute((err, result) => {
          expect(dataProxy.update).toHaveBeenCalledWith(expectedResult, jasmine.any(Function));
        });
      });
    });

    describe("rule execution", () => {
      describe("name", () => {
        it("is required", () => {
          var service = new CategoryService(dataProxy);
          service.insertCommand({}).execute((err, result) => {
            expect(result.errors.length).toEqual(1);
          });
        });
      });
    })
  });

  describe("destroyCommand", () => {
    describe("rule execution", () => {
      it("invalidates a category with orders", () => {
        var orderService = {
          getByCategoryCommand: function(id) {
            return {
              execute: function(done) {
                done(null, {
                  value: [{orderId: 1}]
                });
              }
            };
          }
        };
        dataProxy.destroy = function(err, done) {
          done(null, null);
        };
        var service = new CategoryService(dataProxy, orderService);
        service.destroyCommand(1).execute((err, result) => {
          expect(result.errors.length).toEqual(1);
        });
      });
    })
  });

});
