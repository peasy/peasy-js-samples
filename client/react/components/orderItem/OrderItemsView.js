import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import OrderItemActions from '../../actions/orderItemActions';
import toastr from 'toastr';
import constants from '../../constants';
import OrderViewModel from '../../viewModels/orderViewModel';

let orderItemActions = new OrderItemActions();

class OrderItemsView extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.orderItemRow = this.orderItemRow.bind(this);
    this.ship = this.ship.bind(this);
  }

  render() {
    return (
      <div>
        {this.OrderItemsList()}
      </div>
    );
  }

  AddItemLink() {
    if (this.props.orderId) {
      return (
        <Link to={ `${constants.routes.ORDER}/${this.props.orderId}/orderitem`} className="btn btn-success btn-xs" >Add item</Link>
      );
    }
    return null;
  }

  OrderItemsList() {
    return (
      <div>
        <table className="table orderItemsList">
          <thead>
            <tr>
              <th>{this.AddItemLink()}</th> 
              <th>Product</th>
              <th className="numericCell">Price</th>
              <th className="numericCell">Quantity</th>
              <th className="numericCell">Amount</th>
              <th>Status</th>
              <th>Submitted On</th>
              <th>Shipped On</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.vm.orderItems.map(this.orderItemRow)}
          </tbody>
        </table>
        <div className="form-group">
          <label>Total:</label> {this.props.vm.totalFormatted}
        </div>
      </div>
    );
  }

  shipButton(orderItem) {
    var self = this;
    if (orderItem.canShip) {
      return (
        <input className="btn btn-info btn-xs" 
          type="button" 
          onClick={self.ship(orderItem.id)}
          value="Ship" />
      );
    }
    return null;
  }

  deleteButton(orderItem) {
    var self = this;
    if (orderItem.canDelete) {
      return (
        <input className="btn btn-default btn-xs" 
          type="button" 
          onClick={self.destroy(orderItem.id)}
          value="Delete" />
      );
    }
    return null;
  }

  orderItemRow(orderItem, index) {
    return (
      <tr key={index}>
        <td>{this.shipButton(orderItem)}</td>
        <td>
          <Link to={ `${constants.routes.ORDER}/${orderItem.orderId}/orderitem/${orderItem.id}`}>{orderItem.productName}</Link>
        </td>
        <td className="numericCell">{orderItem.priceFormatted}</td>
        <td className="numericCell">{orderItem.quantity}</td>
        <td className="numericCell">{orderItem.amountFormatted}</td>
        <td>{orderItem.status}</td>
        <td>{orderItem.submittedOn}</td>
        <td>{orderItem.shippedOn}</td>
        <td>{this.deleteButton(orderItem)}</td>
      </tr>
    );
  }

  ship(id) {
    var self = this;
    return function() {
      return self.props.dispatch(orderItemActions.shipOrderItem(id))
        .then(result => {
          if (!result.success) self.handleErrors(result.errors);
        });
    }
  }

  destroy(id) {
    var self = this;
    return function() {
      return self.props.dispatch(orderItemActions.destroy(id))
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
  return {
    vm: new OrderViewModel(
      ownProps.orderId, 
      state.customers,
      state.orders,
      state.orderItems, 
      state.categories, 
      state.products
    )
  };
}

export default connect(mapStateToProps)(OrderItemsView);
