import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ProductActions from '../../actions/productActions';
import InventoryItemActions from '../../actions/inventoryItemActions';
import ProductForm from './ProductForm';
import toastr from 'toastr';
import ManageEntityBase from '../common/ManageEntityBase';
import constants from '../../constants';

let productActions = new ProductActions();
let inventoryItemActions = new InventoryItemActions();

class ManageProduct extends ManageEntityBase {
  constructor(props, context) {
    super(props, context);
  }

  _saveAction(entity) { 
    return productActions.save(entity);
   }

  _redirectUri() {
    return constants.routes.PRODUCTS;
  }

  save(event) {
    var self = this;
    return super.save(event)
      .then((result) => {
        if (result && result.success) {
          return self.props.dispatch(inventoryItemActions.getById(result.value.id));
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
          product={this.state.entity}
          categories={this.props.categories}
          errors={this.state.errors}
          saving={this.state.saving} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  var entity = {};
  var categories = state.categories || [];

  if (ownProps.params.id) {
    var entityId = parseInt(ownProps.params.id, 10);
    if (state.products.length > 0) {
      entity = state.products.find(c => c.id === entityId)
    }
  }

  return {
    entity: entity,
    categories: state.categories.map(c => { return { text: c.name, value: c.id }})
  };
}

export default connect(mapStateToProps)(ManageProduct);