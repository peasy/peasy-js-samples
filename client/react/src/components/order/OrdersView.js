import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderActions from '../../actions/orderActions';
import OrderItemActions from '../../actions/orderItemActions';
import constants from '../../constants';
import OrderLineItemViewModel from '../../viewModels/orderLineItemViewModel';
import ListViewBase from '../../components/common/ListViewBase';

let orderActions = new OrderActions();
let orderItemActions = new OrderItemActions();

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
                <Link className="btn btn-success btn-sm" to={`${constants.routes.ORDERS}/new`}>Create New</Link>
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
          <Link to={`${constants.routes.ORDERS}/${vm.orderId}`}>{vm.orderId}</Link>
        </td>
        <td>{vm.orderDateFormatted}</td>
        <td>{vm.customerName}</td>
        <td className="numericCell">{vm.totalFormatted}</td>
        <td>{vm.status}</td>
        <td>
					<input className="btn btn-secondary btn-sm"
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
          if (!result.success) return self.handleErrors(result.errors);
          return self.props.dispatch(orderItemActions.destroyByOrder(id));
        });
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
