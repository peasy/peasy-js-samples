import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CategoryActions from '../../actions/categoryActions';
import CategoryForm from './CategoryForm';
import toastr from 'toastr';
import ManageEntityBase from '../common/ManageEntityBase';
import constants from '../../constants';

let categoryActions = new CategoryActions();

class ManageCategory extends ManageEntityBase {
  constructor(props, context) {
    super(props, context);
  }

  _saveAction(entity) { 
    return categoryActions.save(entity);
   }

  _redirectUri() {
    return constants.routes.CATEGORIES;
  }

  render() {
    return (
      <div>
        <h1>Manage Category</h1>
        <CategoryForm
          onCancel={this.cancel}
          onChange={this.change}
          onSave={this.save}
          category={this.state.entity}
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
    if (state.categories.length > 0) {
      entity = state.categories.find(c => c.id === entityId)
    }
  }

  return {
    entity: entity 
  };
}

export default connect(mapStateToProps)(ManageCategory);