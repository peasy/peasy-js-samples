describe("ProductService", function() {
  var ProductService = require('../../../business_logic/services/productService');
  var CreateProductCommand = require('../../../business_logic/commands/createProductCommand');
  var DeleteProductCommand = require('../../../business_logic/commands/deleteProductCommand');
  var dataProxy, product;

  beforeEach(() => {
    dataProxy = {
      getById: function(id, done) {
        done(null, {});
      },
      update: function(data, done) {
        done(null, data);
      },
      getByCategory: function(id, done) {
        done(null, {});
      }
    };
    product = {
      id: 1,
      foo: "hello",
      name: "javascript for professionals",
      description: "great book",
      price: 50.25,
      categoryId: 1,
      isAdmin: true
    };
  });

  describe("UpdateCommand", () => {
    it("allows only whitelisted object members", () => {
      spyOn(dataProxy, "update").and.callThrough();
      var expectedResult = {
        id: 1,
        name: "javascript for professionals",
        description: "great book",
        price: 50.25,
        categoryId: 1
      };
      var service = new ProductService(dataProxy);
      service.updateCommand(product).execute((err, result) => {
        expect(dataProxy.update).toHaveBeenCalledWith(expectedResult, jasmine.any(Function));
      });
    });

    describe("rule execution", () => {
      it("invalidates name value greater than 50 characters", () => {
        product.name = "123456789012345678901234567890123456789012345678901234567890";
        var service = new ProductService(dataProxy);
        service.updateCommand(product).execute((err, result) => {
          expect(result.errors.length).toEqual(1);
        });
      });

      it("invalidates price value when it's type is not number", () => {
        product.price = "50.25";
        var service = new ProductService(dataProxy);
        service.updateCommand(product).execute((err, result) => {
          expect(result.errors.length).toEqual(1);
        });
      });

      it("invalidates both rules", () => {
        product.name = "123456789012345678901234567890123456789012345678901234567890";
        product.price = "50.25";
        var service = new ProductService(dataProxy);
        service.updateCommand(product).execute((err, result) => {
          expect(result.errors.length).toEqual(2);
        });
      });
    });
  });

  describe("getByCategoryCommand", () => {
    it("invokes the correct data proxy method", () => {
      spyOn(dataProxy, "getByCategory").and.callThrough();
      var service = new ProductService(dataProxy);
      var id = 1;
      service.getByCategoryCommand(id).execute((err, result) => {
        expect(dataProxy.getByCategory).toHaveBeenCalledWith(1, jasmine.any(Function));
      });
    });
  });

  describe("insertCommand", () => {
    it("invocation returns an instance of CreateProductCommand", () => {
      var service = new ProductService(dataProxy);
      var command = service.insertCommand({});
      expect(command instanceof CreateProductCommand).toBe(true);
    })
  });

  describe("destroyCommand", () => {
    it("invocation returns an instance of DeleteProductCommand", () => {
      var service = new ProductService(dataProxy);
      var command = service.destroyCommand(1);
      expect(command instanceof DeleteProductCommand).toBe(true);
    })
  });

});
