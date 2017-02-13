import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import OrderActions from '../../actions/orderActions';
import toastr from 'toastr';
import constants from '../../constants';
import OrderViewModel from '../../viewModels/orderViewModel';
import OrderLineItemViewModel from '../../viewModels/orderLineItemViewModel';

let orderActions = new OrderActions();

class OrdersView extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.orderRow = this.orderRow.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Orders</h1>
        <Link to={constants.routes.ORDER}>Create New</Link>
        {this.OrdersList()}
      </div>
    );
  }

  OrdersList() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Order Date</th>
              <th>Customer</th>
              <th className="numericCell">Total</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.viewModels.map(this.orderRow)}
          </tbody>
        </table>
      </div>
    );
  }

  orderRow(vm, index) {
    return (
      <tr key={index}>
        <td>
          <Link to={constants.routes.ORDER + '/' + vm.orderId }>{vm.orderId}</Link>
        </td>
        <td>{vm.orderDate}</td>
        <td>{vm.customerName}</td>
        <td className="numericCell">{vm.totalFormatted}</td>
        <td>{vm.status}</td>
        <td>
          <input className="btn btn-default btn-sm" 
            type="button" 
            onClick={this.destroy(vm.orderId)}
            value="Delete" />
        </td>
      </tr>
    );
  }

  destroy(id) {
    var self = this;
    return function() {
      return self.props.dispatch(orderActions.destroy(id))
        .then(result => {
          if (!result.success) self.handleErrors(result.errors);
        });
    }
  }

  handleErrors(errors) {
    if (Array.isArray(errors)) {
      var validationErrors = errors.filter(e => e.association);
      if (validationErrors.length > 0) {
        this.setState({errors: validationErrors})
      }
      var allOthers = errors.filter(e => !e.association);
      allOthers.map(e => e.message).forEach(e => toastr.error(e));
    } else {
      toastr.error(errors.message);
    }
  }
}

function mapStateToProps(state, ownProps) {
  var orders = state.orders || [];
  return {
    viewModels: orders.map(order => new OrderLineItemViewModel(
      order,
      state.orderItems,
      state.customers
    ))
  };
}

export default connect(mapStateToProps)(OrdersView);
