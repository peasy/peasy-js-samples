import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import OrderItemActions from '../../actions/orderItemActions';
import InventoryItemActions from '../../actions/inventoryItemActions';
import toastr from 'toastr';
import constants from '../../constants';
import OrderViewModel from '../../viewModels/orderViewModel';
import ListViewBase from '../../components/common/ListViewBase';

let orderItemActions = new OrderItemActions();
let inventoryItemActions = new InventoryItemActions();

class OrderItemsView extends ListViewBase {

  constructor(props, context) {
    super(props, context);
    this.orderItemRow = this.orderItemRow.bind(this);
    this.ship = this.ship.bind(this);
  }

  _destroyAction(id) {
    return orderItemActions.destroy(id);
  }

  render() {
    return (
      <div>
        {this.OrderItemsList()}
      </div>
    );
  }

  AddItemLink() {
    if (this.props.viewModel.canAddItem) {
      return (
        <Link to={ `${constants.routes.ORDER}/${this.props.viewModel.id}/orderitem`} className="btn btn-success btn-xs" >Add item</Link>
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
            {this.props.viewModel.orderItems.map(this.orderItemRow)}
          </tbody>
        </table>
        <div className="form-group">
          <label>Total:</label> {this.props.viewModel.totalFormatted}
        </div>
      </div>
    );
  }

  shipButton(itemViewModel) {
    var self = this;
    if (itemViewModel.canShip) {
      return (
        <input className="btn btn-info btn-xs" 
          type="button" 
          onClick={self.ship(itemViewModel.orderItem.id)}
          value="Ship" />
      );
    }
    return null;
  }

  deleteButton(itemViewModel) {
    var self = this;
    if (itemViewModel.canDelete) {
      return (
        <input className="btn btn-default btn-xs" 
          type="button" 
          onClick={self.destroy(itemViewModel.orderItem.id)}
          value="Delete" />
      );
    }
    return null;
  }

  orderItemRow(itemViewModel, index) {
    return (
      <tr key={index}>
        <td>{this.shipButton(itemViewModel)}</td>
        <td>
          <Link to={ `${constants.routes.ORDER}/${this.props.viewModel.id}/orderitem/${itemViewModel.orderItem.id}`}>{itemViewModel.productName}</Link>
        </td>
        <td className="numericCell">{itemViewModel.priceFormatted}</td>
        <td className="numericCell">{itemViewModel.orderItem.quantity}</td>
        <td className="numericCell">{itemViewModel.amountFormatted}</td>
        <td>{itemViewModel.orderItem.status}</td>
        <td>{itemViewModel.submittedOnFormatted}</td>
        <td>{itemViewModel.shippedOnFormatted}</td>
        <td>{this.deleteButton(itemViewModel)}</td>
      </tr>
    );
  }

  ship(id) {
    var self = this;
    return function() {
      return self.props.dispatch(orderItemActions.shipOrderItem(id))
        .then(result => {
          if (!result.success) self.handleErrors(result.errors);
          self.props.dispatch(inventoryItemActions.loadData());
        });
    }
  }

}

export default OrderItemsView;
