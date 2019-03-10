import React from 'react';
import {connect} from 'react-redux';
import CustomerActions from '../../actions/customerActions';
import CustomerForm from './CustomerForm';
import ManageEntityBase from '../common/ManageEntityBase';
import constants from '../../constants';
import CustomerViewModel from '../../viewModels/customerViewModel';

let customerActions = new CustomerActions();

class ManageCustomer extends ManageEntityBase {

	_saveAction(viewModel) {
    return customerActions.save(viewModel.entity);
	}

  _redirectUri(savedEntity) {
    return constants.routes.CUSTOMERS;
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
    viewModel: new CustomerViewModel(ownProps.match.params.id, state.customers)
  };

}

export default connect(mapStateToProps)(ManageCustomer);