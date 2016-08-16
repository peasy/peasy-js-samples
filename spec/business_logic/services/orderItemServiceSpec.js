describe("OrderItemService", function() {
  var OrderItemService = require('../../../business_logic/services/orderItemService');
  var DeleteOrderCommand = require('../../../business_logic/commands/deleteOrderCommand');
  var NotFoundError = require('../../../business_logic/shared/notFoundError');
  var ShipOrderItemCommand = require('../../../business_logic/commands/shipOrderItemCommand');
  var dataProxy, orderItem;

  describe("insertCommand", () => {

    beforeEach(() => {
      dataProxy = {
        getById: function(id, done) {
          done(null, {});
        },
        insert: function(data, done) {
          data.id = 1;
          done(null, data);
        },
        getByCustomer: function(id, done) {
          done(null, {});
        },
        update: function(data, done) {
          done(null, {});
        }
      };
      orderItem = {
        foo: "hello",
        orderId: 3,
        isAdmin: true,
        quantity: 4,
        amount: 101,
        price: 25.25,
        productId: 2
      };
    });

    describe("initialization", () => {
      it("allows only whitelisted object members and assigns PENDING status", () => {
        spyOn(dataProxy, "insert").and.callThrough();
        var productDataProxy = {
          getById: function(id, done) {
            done(null, {
              price: 25.25
            });
          }
        };
        var expectedResult = {
          id: 1,
          orderId: 3,
          quantity: 4,
          amount: 101,
          price: 25.25,
          productId: 2,
          status: "PENDING"
        };
        var service = new OrderItemService(dataProxy, productDataProxy);
        service.insertCommand(orderItem).execute((err, result) => {
          expect(dataProxy.insert).toHaveBeenCalledWith(expectedResult, jasmine.any(Function));
        });
      });
    });

    describe("rule execution", () => {
      describe("if all valid", () => {
        var productDataProxy;
        beforeEach(() => {
          productDataProxy = {
            getById: function(id, done) {
              done(null, {
                price: 25.25
              });
            }
          };
          spyOn(productDataProxy, 'getById');
        });
        it ('invalidates all', () => {
          var service = new OrderItemService(dataProxy, productDataProxy);
          service.insertCommand({}).execute((err, result) => {
            expect(result.errors.length).toEqual(5);
            expect(productDataProxy.getById).not.toHaveBeenCalled();
          });
        });

        it ('invalidates all with invalid type', () => {
          var item = {
            orderId: 3,
            quantity: "4",
            amount: "101",
            price: "25.25",
            productId: 2
          };
          var service = new OrderItemService(dataProxy, productDataProxy);
          service.insertCommand(item).execute((err, result) => {
            expect(result.errors.length).toEqual(3);
            expect(productDataProxy.getById).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe("then get rules", () => {
      it ('invalidates item with bad pricing info', () => {
        var productDataProxy = {
          getById: function(id, done) {
            done(null, {
              price: 25
            });
          }
        };
        var service = new OrderItemService(dataProxy, productDataProxy);
        service.insertCommand(orderItem).execute((err, result) => {
          expect(result.errors.length).toEqual(2);
        });
      });
    });
  });

  describe("updateCommand", () => {
    beforeEach(() => {
      dataProxy = {
        getById: function(id, done) {
          done(null, {
            status: "PENDING"
          });
        },
        update: function(data, done) {
          done(null, data);
        },
        getByCustomer: function(id, done) {
          done(null, {});
        }
      };
      orderItem = {
        id: 1,
        foo: "hello",
        orderId: 3,
        isAdmin: true,
        quantity: 4,
        amount: 101,
        price: 25.25,
        productId: 2
      };
    });

    describe("initialization", () => {
      it("allows only whitelisted object members", () => {
        spyOn(dataProxy, "update").and.callThrough();
        var productDataProxy = {
          getById: function(id, done) {
            done(null, {
              price: 25.25
            });
          }
        };
        var orderItemDataProxy = {
        };
        var expectedResult = {
          id: 1,
          orderId: 3,
          quantity: 4,
          amount: 101,
          price: 25.25,
          productId: 2,
          status: "PENDING"
        };
        var service = new OrderItemService(dataProxy, productDataProxy);
        service.updateCommand(orderItem).execute((err, result) => {
          expect(dataProxy.update).toHaveBeenCalledWith(expectedResult, jasmine.any(Function));
        });
      });
    });

    describe("rule execution", () => {
      describe("if all valid", () => {
        var productDataProxy;

        beforeEach(() => {
          productDataProxy = {
            getById: function(id, done) {
              done(null, {
                price: 25.25
              });
            }
          };
          spyOn(dataProxy, 'getById');
        });

        it ('invalidates all', () => {
          var service = new OrderItemService(dataProxy, productDataProxy);
          service.updateCommand({}).execute((err, result) => {
            expect(result.errors.length).toEqual(3);
            expect(dataProxy.getById).not.toHaveBeenCalled();
          });
        });

        it ('invalidates all with invalid type', () => {
          var item = {
            orderId: 3,
            quantity: "4",
            amount: "101",
            price: "25.25",
            productId: 2
          };
          var service = new OrderItemService(dataProxy, productDataProxy);
          service.insertCommand(item).execute((err, result) => {
            expect(result.errors.length).toEqual(3);
            expect(dataProxy.getById).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe("then get rules", () => {
      var productDataProxy = {
        getById: function(id, done) {
          done(null, {
            price: 25
          });
        }
      };

      it ('invalidates item with backordered status', () => {
        dataProxy.getById = function(id, done) {
          done(null, {
            status: "BACKORDERED"
          });
        };
        var service = new OrderItemService(dataProxy, productDataProxy);
        service.updateCommand(orderItem).execute((err, result) => {
          expect(result.errors.length).toEqual(1);
        });
      });

      it ('invalidates item with shipped status', () => {
        dataProxy.getById = function(id, done) {
          done(null, {
            status: "SHIPPED"
          });
        };
        var service = new OrderItemService(dataProxy, productDataProxy);
        service.updateCommand(orderItem).execute((err, result) => {
          expect(result.errors.length).toEqual(1);
        });
      });

      it ('invalidates item with bad pricing info', () => {
        var service = new OrderItemService(dataProxy, productDataProxy);
        service.updateCommand(orderItem).execute((err, result) => {
          expect(result.errors.length).toEqual(2);
        });
      });
    });
  });

  describe("destroyCommand", () => {
    describe("rule execution", () => {
      it("invalidates an item with a shipped status", () => {
        dataProxy.getById = function(id, done) {
          done(null, {
            status: "SHIPPED"
          });
        };
        var service = new OrderItemService(dataProxy);
        service.destroyCommand(1).execute((err, result) => {
          expect(result.errors.length).toEqual(1);
        });
      });
    });
  });

  describe("getByOrderCommand", () => {
    describe("validation success", () => {
      it("invokes the appropriate data proxy method", () => {
        dataProxy.getByOrder = function() {}
        spyOn(dataProxy, 'getByOrder');
        var service = new OrderItemService(dataProxy);
        service.getByOrderCommand(1).execute((err, result) => {
          expect(dataProxy.getByOrder).toHaveBeenCalledWith(1, jasmine.any(Function));
        });
      });
    });
  });

  describe("submitCommand", () => {
    describe("validation success", () => {
      it("invokes the appropriate data proxy method", () => {
        dataProxy.getById = function(id, done) {
          done(null, { id: 1, status: "PENDING"});
        };
        spyOn(dataProxy, 'update').and.callThrough();
        var service = new OrderItemService(dataProxy);
        var date = new Date();
        jasmine.clock().mockDate(date);
        var expectedResult = {
          id: 1,
          status: "SUBMITTED",
          submittedOn: date
        }
        service.submitCommand(1).execute((err, result) => {
          expect(dataProxy.update).toHaveBeenCalledWith(expectedResult, jasmine.any(Function));
        });
      });
    });
    describe("rule execution", () => {
      it('throws a NotFoundError when item is not found', () => {
        dataProxy.getById = function(id, done) {
          done(null, null);
        };
        var service = new OrderItemService(dataProxy);
        service.submitCommand(1).execute((err, result) => {
          expect(err instanceof NotFoundError).toBe(true);
        });
      });

      it("invalidates an item with anything other than pending status", () => {
        dataProxy.getById = function(id, done) {
          done(null, { id: 1, status: "SUBMITTED"});
        };
        var service = new OrderItemService(dataProxy);
        service.submitCommand(1).execute((err, result) => {
          expect(result.errors.length).toEqual(1);
        });
      });
    });
  });

  describe("shipCommand", () => {
    it("invocation returns an instance of ShipOrderItemCommand", () => {
      var service = new OrderItemService(dataProxy);
      var command = service.shipCommand(1);
      expect(command instanceof ShipOrderItemCommand).toBe(true);
    });
  });

});
