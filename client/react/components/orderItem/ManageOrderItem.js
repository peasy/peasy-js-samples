import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import OrderActions from '../../actions/orderActions';
import OrderItemActions from '../../actions/orderItemActions';
import OrderItemForm from './orderItemForm';
import toastr from 'toastr';
import ManageEntityBase from '../common/ManageEntityBase';
import constants from '../../constants';
import OrderItemViewModel from '../../viewModels/orderItemViewModel';

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

export default connect(mapStateToProps)(ManageOrderItem);