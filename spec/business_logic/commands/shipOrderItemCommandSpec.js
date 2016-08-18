describe("ShipOrderItemCommand", function() {
  var ShipOrderItemCommand = require('../../../business_logic/commands/shipOrderItemCommand');
  var OrderService = require('../../../business_logic/services/orderService');
  var InventoryItemService = require('../../../business_logic/services/inventoryItemService');

  describe("ShipOrderItemCommand", () => {

    describe("rule execution", () => {
      var orderItemDataProxy = {
        getById: function(id, done) {
          done(null, { status: "PENDING" });
        }
      };

      //it("ensures order item is in a valid state for shipping", () => {
        //var command = new ShipOrderItemCommand(1, orderItemDataProxy);
        //command.execute((err, result) => {
          //expect(result.errors.length).toEqual(1);
        //});
      //});
    });

    describe("validation success", () => {
      var orderItemDataProxy, inventoryItemDataProxy;

      beforeEach(() => {
        orderItemDataProxy = {
          getById: function(id, done) {
            done(null, { id: 1, status: "SUBMITTED", quantity: 2 });
          },
          update: function(data, done) {
            done(null, data);
          }
        };
        spyOn(orderItemDataProxy, "update").and.callThrough();
      });

      describe("inventory reduction", () => {
        describe("when inventory is on hand", () => {
          beforeEach(() => {
            inventoryItemDataProxy = {
              getById: function(id, done) {
                done(null, {id: 1, quantityOnHand: 2, productId: 3, version: 1});
              },
              getByProduct: function(id, done) {
                done(null, {id: 1, quantityOnHand: 2, productId: 3, version: 1});
              },
              update: function(data, done) {
                done(null, data);
              }
            };
            spyOn(inventoryItemDataProxy, "update").and.callThrough();
          });
          it("reduces inventory result on hand", () => {
            var command = new ShipOrderItemCommand(1, orderItemDataProxy, new InventoryItemService(inventoryItemDataProxy));
            command.execute((err, result) => {
              expect(inventoryItemDataProxy.update).toHaveBeenCalledWith({
                id: 1, quantityOnHand: 0, productId: 3, version: 1
              }, jasmine.any(Function));
            });
          });
          it("updates the order item's status and shipped date appropriately", () => {
            var command = new ShipOrderItemCommand(1, orderItemDataProxy, new InventoryItemService(inventoryItemDataProxy));
            var shippedOn = new Date();
            jasmine.clock().mockDate(shippedOn);
            command.execute((err, result) => {
              expect(orderItemDataProxy.update).toHaveBeenCalledWith({
                id: 1, status: "SHIPPED", shippedOn: shippedOn, quantity: 2
              }, jasmine.any(Function));
            });
          });
        });
        describe("when inventory is not on hand", () => {
          beforeEach(() => {
            inventoryItemDataProxy = {
              getById: function(id, done) {
                done(null, {id: 1, quantityOnHand: 0, productId: 3, version: 1});
              },
              getByProduct: function(id, done) {
                done(null, {id: 1, quantityOnHand: 0, productId: 3, version: 1});
              },
              update: function(data, done) {
                done(null, data);
              }
            };
            spyOn(inventoryItemDataProxy, "update").and.callThrough();
          });
          it("does not reduce inventory", () => {
            var command = new ShipOrderItemCommand(1, orderItemDataProxy, new InventoryItemService(inventoryItemDataProxy));
            command.execute((err, result) => {
              expect(inventoryItemDataProxy.update).not.toHaveBeenCalled();
            });
          });
          it("updates the order item's status and backordered date appropriately", () => {
            var command = new ShipOrderItemCommand(1, orderItemDataProxy, new InventoryItemService(inventoryItemDataProxy));
            var backorderedOn = new Date();
            jasmine.clock().mockDate(backorderedOn);
            command.execute((err, result) => {
              expect(orderItemDataProxy.update).toHaveBeenCalledWith({
                id: 1, status: "BACKORDERED", backorderedOn: backorderedOn, quantity: 2
              }, jasmine.any(Function));
            });
          });
        });
      });

    });

  });

});
