import React from 'react';
import { Link } from 'react-router-dom';
import OrderItemActions from '../../actions/orderItemActions';
import InventoryItemActions from '../../actions/inventoryItemActions';
import constants from '../../constants';
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
        <Link to={ `${constants.routes.ORDERS}/${this.props.viewModel.id}/orderitems/new`} className="btn btn-success btn-sm" >Add item</Link>
      );
    }
    return null;
  }

  OrderItemsList() {
    return (
      <div>
        <table className="table table-hover">
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
				<input className="btn btn-info btn-sm"
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
				<input className="btn btn-secondary btn-sm"
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
          <Link to={ `${constants.routes.ORDERS}/${this.props.viewModel.id}/orderitems/${itemViewModel.orderItem.id}`}>{itemViewModel.productName}</Link>
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
