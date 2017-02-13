import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import OrderActions from '../../actions/orderActions';
import toastr from 'toastr';
import constants from '../../constants';
import OrderLineItemViewModel from '../../viewModels/orderLineItemViewModel';
import ListViewBase from '../../components/common/ListViewBase';

class OrdersView extends ListViewBase {

  constructor(props, context) {
    super(props, context);
    this.orderRow = this.orderRow.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Orders</h1>
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
              <th className="addButtonColumn">
                <Link className="btn btn-success btn-xs" to={constants.routes.ORDER}>Create New</Link>
              </th>
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
        <td></td>
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

  _destroyAction(id) {
    return new OrderActions().destroy(id);
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
