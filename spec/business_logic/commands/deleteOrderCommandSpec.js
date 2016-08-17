describe("DeleteOrderCommand", function() {
  var DeleteOrderCommand = require('../../../business_logic/commands/deleteOrderCommand');
  var OrderItemService = require('../../../business_logic/services/orderItemService');

  describe("DeleteOrderCommand", () => {

    describe("rule execution", () => {
      var orderDataProxy = { };
      var orderItems = [
        { id: 1, status: "SHIPPED" },
        { id: 2, status: "PENDING" },
        { id: 3, status: "SHIPPED" }
      ];
      var orderItemDataProxy = {
        getById: function(id, done) {
          done(null, orderItems[id - 1]);
        },
        getByOrder: function(id, done) {
          done(null, orderItems);
        }
      };
      it("ensures order does not contain any shipped items", () => {
        var command = new DeleteOrderCommand(1, orderDataProxy, new OrderItemService(orderItemDataProxy));
        command.execute((err, result) => {
          expect(result.errors.length).toEqual(2);
        });
      });
    });

    describe("validation success", () => {
      var orderDataProxy, orderItems, orderItemDataProxy;
      beforeEach(() => {
        orderDataProxy = {
          destroy: function(id, done) {
            done(null, null);
          }
        };
        orderItems = [
          { id: 1, status: "BACKORDERED" },
          { id: 2, status: "PENDING" },
          { id: 3, status: "PENDING" }
        ];
        orderItemDataProxy = {
          getById: function(id, done) {
            done(null, orderItems[id - 1]);
          },
          getByOrder: function(id, done) {
            done(null, orderItems);
          },
          destroy: function(id, done) {
            done(null, null);
          }
        };
      });
      it ("deletes all of the associated order items", () => {
        spyOn(orderItemDataProxy, "destroy").and.callThrough();
        var command = new DeleteOrderCommand(1, orderDataProxy, new OrderItemService(orderItemDataProxy));
        command.execute((err, result) => {
          expect(orderItemDataProxy.destroy).toHaveBeenCalledWith(1, jasmine.any(Function));
          expect(orderItemDataProxy.destroy).toHaveBeenCalledWith(2, jasmine.any(Function));
          expect(orderItemDataProxy.destroy).toHaveBeenCalledWith(3, jasmine.any(Function));
        });
      });

      it("deletes the order", () => {
        spyOn(orderDataProxy, "destroy").and.callThrough();
        var command = new DeleteOrderCommand(5, orderDataProxy, new OrderItemService(orderItemDataProxy));
        command.execute((err, result) => {
          expect(orderDataProxy.destroy).toHaveBeenCalledWith(5, jasmine.any(Function));
        });
      });
    });

  });

});
