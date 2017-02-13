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

  _saveAction(viewModel) { 
    return orderActions.save(viewModel.entity);
   }

  _redirectUri(savedEntity) {
    if (this.cancelButtonClicked) {
      return constants.routes.ORDERS;
    }
    return constants.routes.ORDER + '/' + savedEntity.id;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({viewModel: nextProps.viewModel});
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
          dispatch={this.props.dispatch}
          onCancel={this.cancel}
          onChange={this.change}
          onSave={this.save}
          onSubmitOrder={this.submitOrder}
          viewModel={this.state.viewModel}
          errors={this.state.errors}
          saving={this.state.saving} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  var orderId = parseInt(ownProps.params.id);
  return {
    viewModel: new OrderViewModel(
      orderId,
      state.customers,
      state.orders,
      state.orderItems,
      state.categories,
      state.products 
    )
  };
}

export default connect(mapStateToProps)(ManageOrder);