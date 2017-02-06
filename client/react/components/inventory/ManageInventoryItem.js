import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import InventoryItemActions from '../../actions/inventoryItemActions';
import InventoryItemForm from './InventoryItemForm';
import toastr from 'toastr';
import ManageEntityBase from '../common/ManageEntityBase';
import constants from '../../constants';

let inventoryItemActions = new InventoryItemActions();

class ManageInventoryItem extends ManageEntityBase {
  constructor(props, context) {
    super(props, context);
  }

  _saveAction(entity) { 
    return inventoryItemActions.save(entity);
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
          inventoryItem={this.state.entity}
          errors={this.state.errors}
          saving={this.state.saving} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  var entity = {};

  if (ownProps.params.id) {
    var entityId = parseInt(ownProps.params.id, 10);
    if (state.inventoryItems.length > 0) {
      entity = state.inventoryItems.find(c => c.id === entityId)
      var associatedProduct = state.products.find(p => p.id === entity.id);
      entity = Object.assign({}, entity, { name: associatedProduct.name });
    }
  }

  return {
    entity: entity 
  };
}

export default connect(mapStateToProps)(ManageInventoryItem);