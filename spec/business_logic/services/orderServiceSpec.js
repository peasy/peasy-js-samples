describe("OrderService", function() {
  var OrderService = require('../../../business_logic/services/orderService');
  var DeleteOrderCommand = require('../../../business_logic/commands/deleteOrderCommand');
  var dataProxy, product;

  beforeEach(() => {
    dataProxy = {
      getById: function(id, done) {
        done(null, {});
      },
      insert: function(data, done) {
        data.id = 1;
        done(null, data);
      },
      update: function(data, done) {
        done(null, data);
      },
      getByCustomer: function(id, done) {
        done(null, {});
      }
    };
    order = {
      foo: "hello",
      customerId: 3,
      isAdmin: true
    };
  });

  describe("insertCommand", () => {
    it("allows only whitelisted object members", () => {
      spyOn(dataProxy, "insert").and.callThrough();
      var date = new Date();
      jasmine.clock().mockDate(date);
      var expectedResult = {
        id: 1,
        customerId: 3,
        orderDate: date
      };
      var service = new OrderService(dataProxy);
      service.insertCommand(order).execute((err, result) => {
        expect(dataProxy.insert).toHaveBeenCalledWith(expectedResult, jasmine.any(Function));
      });
    });

    describe("rule execution", () => {
      it("requires customer id to be supplied", () => {
        delete order.customerId;
        var service = new OrderService(dataProxy);
        service.insertCommand(order).execute((err, result) => {
          expect(result.errors.length).toEqual(1);
        });
      });
    });
  });

  describe("updateCommand", () => {
    it("allows only whitelisted object members", () => {
      spyOn(dataProxy, "update").and.callThrough();
      var orderItemService = {
        getByOrderCommand: function() {
          return {
            execute: function(done) {
              done(null, { value: [{ status: "PENDING" }] });
            }
          }
        }
      };
      var expectedResult = {
        id: 1,
        customerId: 3
      };
      order.id = 1;
      var service = new OrderService(dataProxy, orderItemService);
      service.updateCommand(order).execute((err, result) => {
        expect(dataProxy.update).toHaveBeenCalledWith(expectedResult, jasmine.any(Function));
      });
    });

    describe("rule execution", () => {
      it("ensures the order is in a valid state for update", () => {
        //spyOn(dataProxy, "update").and.callFake(function(data, done) {
          //console.log("HELLO");
          //data.status = "BACKORDERED";
          //done(null, data);
        //});
        var orderItemService = {
          getByOrderCommand: function() {
            return {
              execute: function(done) {
                done(null, { value: [{ status: "SHIPPED" }] });
              }
            }
          }
        };
        var service = new OrderService(dataProxy, orderItemService);
        service.updateCommand(order).execute((err, result) => {
          expect(result.errors.length).toEqual(1);
        });
      });
    });
  });

  describe("getByCustomerCommand", () => {
    it("invokes the correct data proxy method", () => {
      spyOn(dataProxy, "getByCustomer").and.callThrough();
      var service = new OrderService(dataProxy);
      var id = 1;
      service.getByCustomerCommand(id).execute((err, result) => {
        expect(dataProxy.getByCustomer).toHaveBeenCalledWith(1, jasmine.any(Function));
      });
    });
  });

  describe("destroyCommand", () => {
    it("invocation returns an instance of DeleteProductCommand", () => {
      var service = new OrderService(dataProxy);
      var command = service.destroyCommand(1);
      expect(command instanceof DeleteOrderCommand).toBe(true);
    })
  });

});
