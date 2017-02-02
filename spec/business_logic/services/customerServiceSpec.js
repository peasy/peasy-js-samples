describe("CustomerService", function() {
  var CustomerService = require('../../../business_logic/services/customerService');
  var dataProxy, customer;

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
        customer = {
          name: "Jim Morrison",
          foo: "hello",
          quantityOnHand: 3,
          address: {
            street: "140 1st St.",
            zip: 55555,
            meh: 'bar'
          },
          isAdmin: true
        };
      });
      it("allows only whitelisted object members", () => {
        spyOn(dataProxy, "insert").and.callThrough();
        var expectedResult = {
          id: 1,
          name: "Jim Morrison",
          address: {
            street: "140 1st St.",
            zip: 55555,
          }
        };
        var service = new CustomerService(dataProxy);
        service.insertCommand(customer).execute((err, result) => {
          expect(dataProxy.insert).toHaveBeenCalledWith(expectedResult, jasmine.any(Function));
        });
      });
    });

    describe("rule execution", () => {
      describe("name", () => {
        it("is required", () => {
          var service = new CustomerService(dataProxy);
          service.insertCommand({}).execute((err, result) => {
            expect(result.errors.length).toEqual(1);
          });
        });
        it("is the correct length", () => {
          var service = new CustomerService(dataProxy);
          service.insertCommand({name: "123456789012345678901234567890123456789012345678901234567890"}).execute((err, result) => {
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
        customer = {
          id: 1,
          name: "Jim Morrison",
          foo: "hello",
          quantityOnHand: 3,
          address: {
            street: "140 1st St.",
            zip: 55555,
            meh: 'bar'
          },
          isAdmin: true
        };
      });

      it("allows only whitelisted object members", () => {
        spyOn(dataProxy, "update").and.callThrough();
        var expectedResult = {
          id: 1,
          name: "Jim Morrison",
          address: {
            street: "140 1st St.",
            zip: 55555,
          }
        };
        var service = new CustomerService(dataProxy);
        service.updateCommand(customer).execute((err, result) => {
          expect(dataProxy.update).toHaveBeenCalledWith(expectedResult, jasmine.any(Function));
        });
      });
    });

    describe("rule execution", () => {
      it('invalidates all', () => {
        var service = new CustomerService(dataProxy);
        service.updateCommand({}).execute((err, result) => {
          expect(result.errors.length).toEqual(1);
        });
      });
      describe("id", () => {
        it("is required", () => {
          var service = new CustomerService(dataProxy);
          service.updateCommand({name: 'Jimi Hendrix'}).execute((err, result) => {
            expect(result.errors.length).toEqual(1);
          });
        });
        it("is the correct type", () => {
          var service = new CustomerService(dataProxy);
          service.updateCommand({id: "hello", name: 'Jimi Hendrix'}).execute((err, result) => {
            expect(result.errors.length).toEqual(1);
          });
        });
      });
      describe("name", () => {
        it("is the correct length", () => {
          var service = new CustomerService(dataProxy);
          var payload = {
            id: 1, 
            name:"1234556778812345678901234567890123456789012345678901234567890"
          };
          service.updateCommand(payload).execute((err, result) => {
            expect(result.errors.length).toEqual(1);
          });
        });
      });
    })
  });

  describe("destroyCommand", () => {
    describe("rule execution", () => {
      it("invalidates a customer with orders", () => {
        var orderService = {
          getByCustomerCommand: function(id) {
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
        var service = new CustomerService(dataProxy, orderService);
        service.destroyCommand(1).execute((err, result) => {
          expect(result.errors.length).toEqual(1);
        });
      });
    })
  });

});
