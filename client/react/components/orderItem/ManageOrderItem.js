import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import OrderActions from '../../actions/orderActions';
import OrderItemActions from '../../actions/orderItemActions';
import OrderItemForm from './orderItemForm';
import toastr from 'toastr';
import ManageEntityBase from '../common/ManageEntityBase';
import constants from '../../constants';

let orderActions = new OrderActions();
let orderItemActions = new OrderItemActions();

class ManageOrderItem extends ManageEntityBase {
  constructor(props, context) {
    super(props, context);
    this.state = {
      entity: new OrderItemViewModel(this.state.entity, props.categories, props.products),
      errors: [],
      saving: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.entity.id != nextProps.entity.id) {
      this.setState({
        entity: new OrderItemViewModel(
          Object.assign({}, nextProps.entity),
          nextProps.categories, 
          nextProps.products
        )}
      );
    }
  }

  _saveAction(entity) { 
    return orderItemActions.save(entity._orderItem);
    // var promise = Promise.resolve();
    // if (!this.props.currentOrder && this.props.currentOrder.id) {
    //   promise = orderActions.save({});
    // }
    // return promise.then((result) => {
    //   var orderId = result.id || entity._orderItem.orderId;
    //   return orderItemActions.save(entity._orderItem);
    // });
   }

  _redirectUri() {
    var orderId = this.props.location.pathname.split("/")[3];
    return constants.routes.ORDER + '/' + orderId;
  }

  render() {
    return (
      <div>
        <h1>Manage Order Item</h1>
        <OrderItemForm
          onCancel={this.cancel}
          onChange={this.change}
          onSave={this.save}
          vm={this.state.entity}
          errors={this.state.errors}
          saving={this.state.saving} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  var orderItemId = ownProps.location.pathname.split("/")[5];
  var orderId = ownProps.location.pathname.split("/")[3];
  var entity = {};
  var currentOrder;

  if (orderId) {
    orderId = parseInt(orderId);
    entity.orderId = orderId;
    currentOrder = state.orders.find(o => o.id === orderId);
  }

  if (orderItemId) {
    var entityId = parseInt(orderItemId, 10);
    if (state.orderItems.length > 0) {
      entity = state.orderItems.find(c => c.id === entityId);
    }
  }

  return {
    currentOrder: currentOrder,
    entity: entity,
    categories: state.categories,
    products: state.products
  }
}

class OrderItemViewModel {
  constructor(orderItem, categories, products, inventoryItems) {
    this._orderItem = orderItem;
    this._currentCategoryId;
    this._categories = categories;
    this._products = products;
    this._inventoryItems = inventoryItems;
  }

  get id() {
    return this._orderItem.id;
  }

  get amount() {
    return this.price * this.quantity;
  }

  get price() {
    return parseFloat(this._orderItem.price) || 0;
  }
  set price(value) {
    this._orderItem.price = parseFloat(value);
    this._orderItem.amount = this.amount;
  }

  get quantity() {
    return parseFloat(this._orderItem.quantity) || 0;
  }
  set quantity(value) {
    this._orderItem.quantity = parseFloat(value);
    this._orderItem.amount = this.amount;
  }

  get categoryId() {
    return this._currentCategoryId;
  }
  set categoryId(value) {
    this._currentCategoryId = parseInt(value);
    this.productId = null;
  }

  get categories() {
    return this._categories || [];
  }

  get products() {
    if (this._currentCategoryId) {
      return this._products.filter(p => p.categoryId === this._currentCategoryId);
    }
    return this._products;
  }

  get productId() {
    return parseInt(this._orderItem.productId) || 0;
  }
  set productId(value) {
    if (value) {
      var productId = parseInt(value);
      var product = this._products.find(p => parseInt(p.id) === productId);
      this._orderItem.productId = product.id;
      this.price = product.price;
    } else {
      delete this._orderItem.productId;
      this.price = 0;
    }
  }
}

export default connect(mapStateToProps)(ManageOrderItem);