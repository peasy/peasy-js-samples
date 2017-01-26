import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as customerActions from '../actions/customerActions';
import CustomerForm from './CustomerForm';
import toastr from 'toastr';

class ManageCustomer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      customer: Object.assign({}, props.customer),
      errors: {},
      saving: false
    };
    this.change = this.change.bind(this);
    this.save = this.save.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.customer.id != nextProps.customer.id) {
      this.setState({customer: Object.assign({}, nextProps.customer)});
    }
  }

  save(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveCustomer(this.state.customer)
      .then(() => {
        this.setState({saving: false});
        toastr.success("Customer saved");
        this.context.router.push('/');
      });
  }

  change(event) {
    const field = event.target.name;
    let customer = this.state.customer;
    customer[field] = event.target.value;
    return this.setState({customer: customer});
  };

  render() {
    return (
      <div>
        <h1>Manage Customer</h1>
        <CustomerForm
          onChange={this.change}
          onSave={this.save}
          customer={this.state.customer}
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
  var customer = {};

  if (ownProps.params.id) {
    var customerId = parseInt(ownProps.params.id, 10);
    if (state.customers.length > 0) {
      customer = state.customers.find(c => c.id === customerId)
    }
  }

  return {
    customer: customer 
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(customerActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCustomer);