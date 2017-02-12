import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CustomerActions from '../../actions/customerActions';
import CustomerForm from './CustomerForm';
import toastr from 'toastr';
import ManageEntityBase from '../common/ManageEntityBase';
import constants from '../../constants';
import CustomerViewModel from '../../viewModels/customerViewModel';

let customerActions = new CustomerActions();

class ManageCustomer extends ManageEntityBase {

  _saveAction(viewModel) { 
    return customerActions.save(viewModel.entity);
   }

  _redirectUri(viewModel) {
    return constants.routes.ROOT;
  }

  render() {
    return (
      <div>
        <h1>Manage Customer</h1>
        <CustomerForm
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
    viewModel: new CustomerViewModel(ownProps.params.id, state.customers) 
  };

}

export default connect(mapStateToProps)(ManageCustomer);