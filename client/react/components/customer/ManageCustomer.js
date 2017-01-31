import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CustomerActions from '../../actions/customerActions';
import CustomerForm from './CustomerForm';
import toastr from 'toastr';
import ManageEntityBase from '../common/ManageEntityBase';

let customerActions = new CustomerActions();

class ManageCustomer extends ManageEntityBase {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <h1>Manage Customer</h1>
        <CustomerForm
          onCancel={this.cancel}
          onChange={this.change}
          onSave={this.save}
          customer={this.state.entity}
          errors={this.state.errors}
          saving={this.state.saving} />
      </div>
    );
  }
}

ManageCustomer.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  var entity = {};

  if (ownProps.params.id) {
    var entityId = parseInt(ownProps.params.id, 10);
    if (state.customers.length > 0) {
      entity = state.customers.find(c => c.id === entityId)
    }
  }

  return {
    entity: entity 
  };
}

export default connect(mapStateToProps)(ManageCustomer);