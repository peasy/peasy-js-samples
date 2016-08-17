describe("DeleteProductCommand", function() {
  var DeleteProductCommand = require('../../../business_logic/commands/deleteProductCommand');
  var OrderService = require('../../../business_logic/services/orderService');
  var InventoryItemService = require('../../../business_logic/services/inventoryItemService');

  describe("DeleteProductCommand", () => {

    describe("rule execution", () => {
      var orders = [ { id: 1 }, { id: 2 }, { id: 3 } ];
      var productDataProxy = { };
      var orderDataProxy = {
        getByProduct: function(id, done) {
          done(null, orders);
        }
      };
      it("ensures product is not associated with any orders", () => {
        var command = new DeleteProductCommand(1, productDataProxy, new OrderService(orderDataProxy));
        command.execute((err, result) => {
          expect(result.errors.length).toEqual(1);
        });
      });
    });

    describe("validation success", () => {
      var orderDataProxy, inventoryItemDataProxy, productDataProxy;

      beforeEach(() => {
        orderDataProxy = {
          getByProduct: function(id, done) {
            done(null, []);
          }
        };
        productDataProxy = {
          destroy: function(id, done) {
            done(null, null);
          }
        };
        inventoryItemDataProxy = {
          getByProduct: function(id, done) {
            done(null, {id: 1});
          },
          destroy: function(id, done) {
            done(null, null);
          }
        };
      });

      it ("deletes the associated inventory item", () => {
        spyOn(inventoryItemDataProxy, "destroy").and.callThrough();
        var command = new DeleteProductCommand(
          1, productDataProxy, new OrderService(orderDataProxy), new InventoryItemService(inventoryItemDataProxy)
        );
        command.execute((err, result) => {
          expect(inventoryItemDataProxy.destroy).toHaveBeenCalledWith(1, jasmine.any(Function));
        });
      });

      it("deletes the product", () => {
        spyOn(productDataProxy, "destroy").and.callThrough();
        var command = new DeleteProductCommand(
          5, productDataProxy, new OrderService(orderDataProxy), new InventoryItemService(inventoryItemDataProxy)
        );
        command.execute((err, result) => {
          expect(productDataProxy.destroy).toHaveBeenCalledWith(5, jasmine.any(Function));
        });
      });
    });

  });

});
