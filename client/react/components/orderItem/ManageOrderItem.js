import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import OrderItemActions from '../../actions/orderItemActions';
import OrderItemForm from './orderItemForm';
import ManageEntityBase from '../common/ManageEntityBase';
import constants from '../../constants';
import OrderItemViewModel from '../../viewModels/orderItemViewModel';

let orderItemActions = new OrderItemActions();

class ManageOrderItem extends ManageEntityBase {

  _saveAction(viewModel) { 
    return orderItemActions.save(viewModel.entity);
   }

  _redirectUri(savedEntity) {
    var currentOrder = savedEntity || this.props.viewModel.entity;
    return constants.routes.ORDER + '/' + currentOrder.orderId;
  }

  render() {
    return (
      <div>
        <h1>Manage Order Item</h1>
        <OrderItemForm
          onCancel={this.cancel}
          onChange={this.change}
          onSave={this.save}
          viewModel={this.state.viewModel}
          errors={this.state.errors}
          saving={this.state.saving} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  var orderId = ownProps.params.id[0];
  var orderItemId = ownProps.params.id[1];
  return {
    viewModel: new OrderItemViewModel(
      orderId,
      orderItemId,
      state.orderItems,
      state.categories,
      state.products,
      state.inventoryItems
    )
  }
}

export default connect(mapStateToProps)(ManageOrderItem);