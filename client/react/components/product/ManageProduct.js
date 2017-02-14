import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ProductActions from '../../actions/productActions';
import InventoryItemActions from '../../actions/inventoryItemActions';
import ProductForm from './ProductForm';
import toastr from 'toastr';
import ManageEntityBase from '../common/ManageEntityBase';
import constants from '../../constants';
import ProductViewModel from '../../viewModels/productViewModel';

let productActions = new ProductActions();
let inventoryItemActions = new InventoryItemActions();

class ManageProduct extends ManageEntityBase {

  _saveAction(viewModel) { 
    return productActions.save(viewModel.entity);
   }

  _redirectUri(savedEntity) {
    return constants.routes.PRODUCTS;
  }

  save(event) {
    var self = this;
    return super.save(event)
      .then((result) => {
        if (result && result.success) {
          return self.props.dispatch(inventoryItemActions.loadData());
        }
      });
  }

  render() {
    return (
      <div>
        <h1>Manage Product</h1>
        <ProductForm
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
    viewModel: new ProductViewModel(ownProps.params.id, state.products, state.categories) 
  };
}

export default connect(mapStateToProps)(ManageProduct);