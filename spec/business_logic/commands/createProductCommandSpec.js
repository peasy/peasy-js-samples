describe("CreateProductCommand", function() {
  var CreateProductCommand = require('../../../business_logic/commands/createProductCommand');
  var InventoryService = require('../../../business_logic/services/inventoryItemService');

  describe("CreateProductCommand", () => {

    var dataProxy, inventoryService, inventoryDataProxy;

    beforeEach(() => {
      inventoryDataProxy = {
        insert: function(data, done) {
          done(null, data);
        }
      };
      spyOn(inventoryDataProxy, "insert").and.callThrough();
      inventoryService = new InventoryService(inventoryDataProxy);
    });

    describe("initialization", () => {
      beforeEach(() => {
        dataProxy = {
          insert: function(data, done) {
            data.id = 1;
            done(null, data);
          }
        };
        spyOn(dataProxy, "insert").and.callThrough();
      });
      it("parses incoming values as expected", () => {
        var payload = {
          name: "Duane Allman",
          price: "52.75",
          categoryId: "1" 
        };
        var command = new CreateProductCommand(payload, dataProxy, inventoryService);
        command.execute((err, result) => {
          expect(result.value.categoryId).toEqual(1);
          expect(result.value.price).toEqual(52.75);
        });
      })
      it("allows only whitelisted object members", () => {
        var payload = {
          id: 1000,
          foo: "hello",
          name: "javascript for professionals",
          description: "great book",
          price: 50.25,
          categoryId: 1,
          isAdmin: true
        };
        var expectedResult = {
          id: 1,
          name: "javascript for professionals",
          description: "great book",
          price: 50.25,
          categoryId: 1
        };
        var command = new CreateProductCommand(payload, dataProxy, inventoryService);
        command.execute((err, result) => {
          expect(dataProxy.insert).toHaveBeenCalledWith(expectedResult, jasmine.any(Function));
        });
      });
    });

    describe("rule execution", () => {
      it("ensures all required fields are supplied", () => {
        var dataProxy = {};
        var payload = {};
        var command = new CreateProductCommand(payload, dataProxy);
        command.execute((err, result) => {
          expect(result.errors.length).toEqual(3);
        });
      });
      it("ensures all data types and field lengths are correct ", () => {
        var dataProxy = {};
        var payload = {
          name: "123456789012345678901234567890123456789012345678901234567890",
          price: "badprice",
          categoryId: 1
        };
        var command = new CreateProductCommand(payload, dataProxy);
        command.execute((err, result) => {
          expect(result.errors.length).toEqual(2);
        });
      });
    });

    describe("validation success", () => {
      var dataProxy, inventoryItemDataProxy, payload, expectedResult;
      beforeEach(() => {
        dataProxy = {
          insert: function(data, done) {
            data.id = 1;
            done(null, data);
          }
        };
        spyOn(dataProxy, "insert").and.callThrough();
      });

      it("creates a new product", () => {
        var payload = {
          foo: "hello",
          name: "javascript patterns",
          description: "teh awesome",
          price: 23,
          isAdmin: true,
          categoryId: 2
        };
        var expectedResult = {
          id: 1,
          name: "javascript patterns",
          description: "teh awesome",
          price: 23,
          categoryId: 2
        };
        var command = new CreateProductCommand(payload, dataProxy);
        command.execute((err, result) => {
          expect(dataProxy.insert).toHaveBeenCalledWith(expectedResult, jasmine.any(Function));
        });
      });

      it("creates an inventory item associated with the product", () => {
        var product = {
          name: "javascript patterns",
          description: "teh awesome",
          price: 23,
          categoryId: 2
        };
        var expectedResult = {
          productId: 1,
          quantityOnHand: 0,
          version: 1
        };
        var command = new CreateProductCommand(product, dataProxy, inventoryService);
        command.execute((err, result) => {
          expect(inventoryDataProxy.insert).toHaveBeenCalledWith(expectedResult, jasmine.any(Function));
        });
      });
    });

  });

});
