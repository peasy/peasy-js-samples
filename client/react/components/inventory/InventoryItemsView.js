import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import InventoryItemActions from '../../actions/inventoryItemActions';
import toastr from 'toastr';
import constants from '../../constants';

let inventoryItemActions = new InventoryItemActions();

class InventoryItemsView extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.inventoryItemRow = this.inventoryItemRow.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Inventory Items</h1>
        {this.InventoryItemsList()}
      </div>
    );
  }

  InventoryItemsList() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th className="numericCell">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {this.props.inventoryItems.map(this.inventoryItemRow)}
        </tbody>
      </table>
    );
  }

  inventoryItemRow(inventoryItem, index) {
    return (
      <tr key={index}>
        <td>
          <Link to={ constants.routes.INVENTORY_ITEM + '/' + inventoryItem.id }>{inventoryItem.name}</Link>
        </td>
        <td className="numericCell">
          {inventoryItem.quantityOnHand}
        </td>
      </tr>
    );
  }

}

function mapStateToProps(state, ownProps) {
  var items = state.inventoryItems.map(i => {
    var associatedProduct = state.products.find(p => p.id === i.productId);
    return Object.assign({}, i, { name: associatedProduct.name });
  });
  return {
    inventoryItems: items
  };
}

export default connect(mapStateToProps)(InventoryItemsView);