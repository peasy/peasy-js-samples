import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import OrderActions from '../../actions/orderActions';
import OrderForm from './OrderForm';
import toastr from 'toastr';
import ManageEntityBase from '../common/ManageEntityBase';
import constants from '../../constants';
import OrderViewModel from '../../viewModels/orderViewModel';

let orderActions = new OrderActions();

class ManageOrder extends ManageEntityBase {
  constructor(props, context) {
    super(props, context);
    this.cancelButtonClicked = false;
    this.submitOrder = this.submitOrder.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ entity: nextProps.entity });
  // }

  _saveAction(viewModel) { 
    return orderActions.save(viewModel.entity);
   }

  _redirectUri(viewModel) {
    if (this.cancelButtonClicked) {
      return constants.routes.ORDERS;
    }
    return constants.routes.ORDER + '/' + viewModel.entity.id;
  }

  submitOrder() {
    var orderId = this.props.viewModel.entity.id;
    this.props.dispatch(orderActions.submitOrder(orderId))
      .then(() => toastr.success("Order submitted"));
  }

  cancel() {
    this.cancelButtonClicked = true;
    super.cancel();
  }

  render() {
    return (
      <div>
        <h1>Manage Order</h1>
        <OrderForm
          onCancel={this.cancel}
          onChange={this.change}
          onSave={this.save}
          onSubmitOrder={this.submitOrder}
          orderItems={this.props.orderItems}
          order={this.state.entity}
          errors={this.state.errors}
          saving={this.state.saving} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    entity: new OrderViewModel(
      parseInt(ownProps.params.id),
      state.customers,
      state.orders,
      state.orderItems,
      state.categories,
      state.products 
    ),
    orderItems: state.orderItems
  };
}

export default connect(mapStateToProps)(ManageOrder);