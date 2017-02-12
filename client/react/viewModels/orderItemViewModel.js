import ViewModelBase from '../viewModels/viewModelBase';

function formatDollars(value) {
  return value.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2})
}

class OrderItemViewModel extends ViewModelBase {
  constructor(orderId, orderItemId, orderItems, categories, products, inventoryItems) {
    super(orderItemId, orderItems);
    this.entity.orderId = orderId;
    this._currentCategoryId;
    this._categories = categories;
    this._products = products;
    this._inventoryItems = inventoryItems;
    this._selectedCategoryId;
    this._inventoryCount;
  }

  get categorySelectValues() {
    return this._categories.map(c => { return { text: c.name, value: c.id }});
  }

  get categoryId() {
    if (!this._selectedCategoryId) {
      if (this.entity.productId) {
        var product = this._products.find(p => p.id === this.entity.productId);
        this._selectedCategoryId = product.categoryId;
      }
    }
    return this._selectedCategoryId;
  }

  set categoryId(value) {
    var categoryId = parseInt(value);
    this._selectedCategoryId = categoryId;
    this.productId = null;
  }

  get productId() {
    return this.entity.productId || 0;
  }

  set productId(value) {
    if (value) {
      var productId = parseInt(value);
      var product = this._products.find(p => p.id === productId);
      this.entity.productId = productId;
      this.entity.price = product.price;
      this.entity.amount = this.amount;
    } else {
      delete this.entity.productId;
      this.entity.price = 0;
      this.entity.amount = 0;
    }
    this._inventoryCount = null;
  }

  get availableProducts() {
    if (this.categoryId) {
      return this._products.filter(p => p.categoryId === this.categoryId);
    } 
    return this._products;
  }

  get productSelectValues() {
    return this.availableProducts.map(p => { return { text: p.name, value: p.id }});
  }

  set quantity(value) {
    this.entity.quantity = parseFloat(value);
    this.entity.amount = this.amount;
  }

  get amount() {
    if (this.entity.quantity && this.entity.price) {
      return this.entity.quantity * this.entity.price;
    }
  }

  get amountFormatted() {
    if (this.amount) {
      return formatDollars(this.amount);
    }
  }

  get priceFormatted() {
    if (this.entity.price) {
      return formatDollars(this.entity.price);
    }
  }

  get inventoryCount() {
    if (!this._inventoryCount) {
      var productId = this.productId;
      if (productId) {
        var item = this._inventoryItems.find(i => i.productId == productId);
        this._inventoryCount = item.quantityOnHand;
      }
    }
    return this._inventoryCount;
  }





  // get price() {
  //   return parseFloat(this._orderItem.price) || 0;
  // }

  // set price(value) {
  //   this._orderItem.price = parseFloat(value);
  //   this._orderItem.amount = this.amount;
  // }

  // get quantity() {
  //   return parseFloat(this._orderItem.quantity) || 0;
  // }

  // set quantity(value) {
  //   this._orderItem.quantity = parseFloat(value);
  //   this._orderItem.amount = this.amount;
  // }





  // get id() {
  //   return this._orderItem.id;
  // }

  // get amountFormatted() {
  //   return formatDollars(this.amount);
  // }

  // get amount() {
  //   return this.price * this.quantity;
  // }

  // get priceFormatted() {
  //   return formatDollars(this.price);
  // }

  // get price() {
  //   return parseFloat(this._orderItem.price) || 0;
  // }

  // set price(value) {
  //   this._orderItem.price = parseFloat(value);
  //   this._orderItem.amount = this.amount;
  // }

  // get quantity() {
  //   return parseFloat(this._orderItem.quantity) || 0;
  // }

  // set quantity(value) {
  //   this._orderItem.quantity = parseFloat(value);
  //   this._orderItem.amount = this.amount;
  // }

  // get categoryId() {
  //   return this._currentCategoryId;
  // }

  // set categoryId(value) {
  //   this._currentCategoryId = parseInt(value);
  //   this.productId = null;
  // }

  // get categories() {
  //   return this._categories || [];
  // }

  // get products() {
  //   if (this._currentCategoryId) {
  //     return this._products.filter(p => p.categoryId === this._currentCategoryId);
  //   }
  //   return this._products;
  // }

  // get productId() {
  //   return parseInt(this._orderItem.productId) || 0;
  // }

  // set productId(value) {
  //   if (value) {
  //     var productId = parseInt(value);
  //     var product = this._products.find(p => parseInt(p.id) === productId);
  //     this._orderItem.productId = product.id;
  //     this.price = product.price;
  //   } else {
  //     delete this._orderItem.productId;
  //     this.price = 0;
  //   }
  // }

  // get productName() {
  //   var product = this.products.find(p => p.id === this.productId);
  //   if (product) {
  //     return product.name;
  //   } 
  //   return "";
  // }

  // get submittedOn() {
  //   var submittedOn = this._orderItem.submittedOn;
  //   if (!submittedOn) return '-';
  //   return new Date(submittedOn).toLocaleString();
  // }

  // get shippedOn() {
  //   var shippedOn = this._orderItem.shippedOn;
  //   if (!shippedOn) return '-';
  //   return new Date(shippedOn).toLocaleString();
  // }

  // get status() {
  //   return this._orderItem.status || '';
  // }

  // get canDelete() {
  //   return this._orderItem.status !== "SHIPPED";
  // }

  // get canShip() {
  //   return this._orderItem.status === "SUBMITTED" ||
  //          this._orderItem.status === "BACKORDERED";
  // }

  // get orderId() {
  //   return this._orderItem.orderId;
  // }
}

export default OrderItemViewModel;