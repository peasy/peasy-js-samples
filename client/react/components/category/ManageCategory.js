import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CategoryActions from '../../actions/categoryActions';
import CategoryForm from './CategoryForm';
import ManageEntityBase from '../common/ManageEntityBase';
import constants from '../../constants';
import CategoryViewModel from '../../viewModels/categoryViewModel';

let categoryActions = new CategoryActions();

class ManageCategory extends ManageEntityBase {

  _saveAction(viewModel) { 
    return categoryActions.save(viewModel.entity);
   }

  _redirectUri(savedEntity) {
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
          viewModel={this.state.viewModel}
          errors={this.state.errors}
          saving={this.state.saving} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    viewModel: new CategoryViewModel(ownProps.params.id, state.categories) 
  };
}

export default connect(mapStateToProps)(ManageCategory);