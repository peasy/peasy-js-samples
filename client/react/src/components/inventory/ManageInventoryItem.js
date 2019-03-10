import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import InventoryItemActions from '../../actions/inventoryItemActions';
import InventoryItemForm from './InventoryItemForm';
import ManageEntityBase from '../common/ManageEntityBase';
import constants from '../../constants';
import InventoryItemViewModel from '../../viewModels/inventoryItemViewModel';

let inventoryItemActions = new InventoryItemActions();

class ManageInventoryItem extends ManageEntityBase {

  _saveAction(viewModel) {
    return inventoryItemActions.save(viewModel.entity);
   }

  _redirectUri() {
    return constants.routes.INVENTORY_ITEMS;
  }

  render() {
    return (
      <div>
        <h1>Manage Inventory Item</h1>
        <InventoryItemForm
          onCancel={this.cancel}
          onChange={this.change}
          onSave={this.save}
          viewModel={this.state.viewModel}
          errors={this.state.errors}
          saving={this.state.saving} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    viewModel: new InventoryItemViewModel(ownProps.match.params.id, state.inventoryItems, state.products)
  };
}

export default connect(mapStateToProps)(ManageInventoryItem);