import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import OrderActions from '../../actions/orderActions';
import toastr from 'toastr';
import constants from '../../constants';

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
      <table className="table">
        <thead>
          <tr>
            <th>Order Date</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.orders.map(this.orderRow)}
        </tbody>
      </table>
    );
  }

  orderRow(order, index) {
    return (
      <tr key={index}>
        <td>
          <Link to={constants.routes.ORDER + '/' + order.id }>{order.orderDate}</Link>
        </td>
        <td>{order.customerName}</td>
        <td></td>
        <td></td>
        <td>
          <input className="btn btn-default btn-sm" 
            type="button" 
            onClick={this.destroy(order.id)}
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
          return self.props.dispatch(inventoryItemActions.destroy(id));
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
  orders = orders.map(o => {
    var customer = state.customers.find(c => c.id === o.customerId);
    return Object.assign({}, o, { customerName: customer.name });
  });
  return {
    orders: orders
  };
}

export default connect(mapStateToProps)(OrdersView);
