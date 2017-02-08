import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import OrderItemActions from '../../actions/orderItemActions';
import toastr from 'toastr';
import constants from '../../constants';

let orderItemActions = new OrderItemActions();

class OrderItemsView extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.orderItemRow = this.orderItemRow.bind(this);
  }

  render() {
    return (
      <div>
        {this.AddItemLink()}
        {this.OrderItemsList()}
      </div>
    );
  }

  AddItemLink() {
    if (this.props.orderId) {
      return (
        <Link to={ `${constants.routes.ORDER}/${this.props.orderId}/orderitem`}>Add item</Link>
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
            {this.props.orderItems.map(this.orderItemRow)}
          </tbody>
        </table>
        <div className="form-group">
          <label>Total:</label> {this.getTotal()}
        </div>
      </div>
    );
  }

  getTotal() {
    if (this.props.orderItems.length > 0)
      return this.props.orderItems.map(i => i.amount).reduce((a = 0, b) => a + b);
  }

  orderItemRow(orderItem, index) {
    return (
      <tr key={index}>
        <td>
          <Link to={ `${constants.routes.ORDER}/${orderItem.orderId}/orderitem/${orderItem.id}`}>{orderItem.productName}</Link>
          {/*<Link to={constants.routes.ORDER_ITEM + '/' + orderItem.id }>{orderItem.productName}</Link>*/}
        </td>
        <td className="numericCell">{orderItem.price}</td>
        <td className="numericCell">{orderItem.quantity}</td>
        <td className="numericCell">{orderItem.amount}</td>
        <td>{orderItem.status}</td>
        <td>{orderItem.submittedOn || '-'}</td>
        <td>{orderItem.shippedOn || '-'}</td>
        <td>
          <input className="btn btn-default btn-sm" 
            type="button" 
            onClick={this.destroy(orderItem.id)}
            value="Delete" />
        </td>
      </tr>
    );
  }

  destroy(id) {
    var self = this;
    return function() {
      return self.props.dispatch(orderItemActions.destroy(id))
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
  var orderItems = [];
  var orderId = ownProps.orderId;
  if (orderId) {
    orderItems = state.orderItems.filter(i => i.orderId === orderId)
                                 .map(i => {
      var product = state.products.find(p => p.id === i.productId);
      return Object.assign({}, i, { productName: product.name });
    });
  }
  return {
    orderItems: orderItems
  };
}

export default connect(mapStateToProps)(OrderItemsView);
