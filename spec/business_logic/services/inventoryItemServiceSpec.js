describe("InventoryItemService", function() {
  var InventoryItemService = require('../../../business_logic/services/inventoryItemService');
  var dataProxy, inventoryItem;

  describe("insertCommand", () => {

    beforeEach(() => {
      dataProxy = {
        insert: function(data, done) {
          data.id = 1;
          done(null, data);
        },
        update: function(data, done) {
          done(null, {});
        }
      };
    });

    describe("initialization", () => {
      beforeEach(() => {
        inventoryItem = {
          foo: "hello",
          quantityOnHand: 3,
          isAdmin: true,
          productId: 2
        };
      });
      it("defaults quantityOnHand to 0 if it is not supplied", () => {
        var service = new InventoryItemService(dataProxy);
        delete inventoryItem.quantityOnHand;
        service.insertCommand(inventoryItem).execute((err, result) => {
          expect(result.value.quantityOnHand).toEqual(0);
        });
      });
      it("defaults version to 1", () => {
        var service = new InventoryItemService(dataProxy);
        service.insertCommand(inventoryItem).execute((err, result) => {
          expect(result.value.version).toEqual(1);
        });
      });
      it("allows only whitelisted object members and assigns a version number", () => {
        spyOn(dataProxy, "insert").and.callThrough();
        var expectedResult = {
          id: 1,
          version: 1,
          quantityOnHand: 3,
          productId: 2
        };
        var service = new InventoryItemService(dataProxy);
        service.insertCommand(inventoryItem).execute((err, result) => {
          expect(dataProxy.insert).toHaveBeenCalledWith(expectedResult, jasmine.any(Function));
        });
      });
    });

    describe("rule execution", () => {
      describe("if all valid", () => {

        it ('invalidates all', () => {
          var service = new InventoryItemService(dataProxy);
          service.insertCommand({}).execute((err, result) => {
            expect(result.errors.length).toEqual(1);
          });
        });

        it ('invalidates all with invalid type', () => {
          inventoryItem = {
            quantityOnHand: '3',
            productId: 2
          };
          var service = new InventoryItemService(dataProxy);
          service.insertCommand(inventoryItem).execute((err, result) => {
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
        inventoryItem = {
          id: 1,
          foo: "hello",
          quantityOnHand: 3,
          isAdmin: true,
          productId: 2,
          version: 1
        };
      });

      it("allows only whitelisted object members and assigns a version number", () => {
        spyOn(dataProxy, "update").and.callThrough();
        var expectedResult = {
          id: 1,
          version: 1,
          quantityOnHand: 3,
          productId: 2
        };
        var service = new InventoryItemService(dataProxy);
        service.updateCommand(inventoryItem).execute((err, result) => {
          expect(dataProxy.update).toHaveBeenCalledWith(expectedResult, jasmine.any(Function));
        });
      });

      it("successfully converts valid stringified values", () => {
        spyOn(dataProxy, "update").and.callThrough();
        var expectedResult = {
          id: 1,
          version: 2,
          quantityOnHand: 3.755,
          productId: 2
        };
        inventoryItem.id = "1";
        inventoryItem.version = "2";
        inventoryItem.quantityOnHand = "3.755";
        inventoryItem.productId = "2";
        var service = new InventoryItemService(dataProxy);
        service.updateCommand(inventoryItem).execute((err, result) => {
          expect(dataProxy.update).toHaveBeenCalledWith(expectedResult, jasmine.any(Function));
        });
      });
    });

    describe("rule execution", () => {
      describe("id", () => {
        it("is required", () => {
          var service = new InventoryItemService(dataProxy);
          service.updateCommand({version: 1, quantityOnHand: 0}).execute((err, result) => {
            expect(result.errors.length).toEqual(1);
          });
        });
        it("is the correct type", () => {
          var service = new InventoryItemService(dataProxy);
          service.updateCommand({id: "badvalue", version: 1, quantityOnHand: 0}).execute((err, result) => {
            expect(result.errors.length).toEqual(1);
          });
        });
      });
      describe("quantityOnHand", () => {
        it("is the correct type", () => {
          var service = new InventoryItemService(dataProxy);
          service.updateCommand({id: 1, version: 1, quantityOnHand: "0"}).execute((err, result) => {
            expect(result.errors.length).toEqual(1);
          });
        });
      });
      describe("version", () => {
        it("is required", () => {
          var service = new InventoryItemService(dataProxy);
          service.updateCommand({id: 1, quantityOnHand: 0}).execute((err, result) => {
            expect(result.errors.length).toEqual(1);
          });
        });
        it("is the correct type", () => {
          var service = new InventoryItemService(dataProxy);
          service.updateCommand({id: 1, version: "badvalue", quantityOnHand: 0}).execute((err, result) => {
            expect(result.errors.length).toEqual(1);
          });
        });
      });
      it ('invalidates all', () => {
        var service = new InventoryItemService(dataProxy);
        service.updateCommand({}).execute((err, result) => {
          expect(result.errors.length).toEqual(2);
        });
      });
    });
  });

  describe("getProductCommand", () => {
    describe("validation success", () => {
      it("invokes the appropriate data proxy method", () => {
        var dataProxy = {
          getByProduct: function() {}
        };
        spyOn(dataProxy, 'getByProduct').and.callThrough();
        var service = new InventoryItemService(dataProxy);
        service.getByProductCommand(1).execute((err, result) => {
          expect(dataProxy.getByProduct).toHaveBeenCalled();
        });
      });
    });
  });

});
