import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as customerActions from '../actions/customerActions';
import CustomerForm from './CustomerForm';

class ManageCustomer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      customer: Object.assign({}, props.customer),
      errors: {}
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
    this.props.actions.saveCustomer(this.state.customer);
    this.context.router.push('/');
  }

  change(event) {
    const field = event.target.name;
    let customer = this.state.customer;
    customer[field] = event.target.value;
    return this.setState({customer: customer});
  };

  getErrors() {
    return { title: ''};
  }

  render() {
    return (
      <div>
        <h1>Manage Customer</h1>
        <CustomerForm
          customer={this.state.customer}
          onSave={this.save}
          onChange={this.change}
          errors={this.state.errors} />
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
  console.log("MAP STATE TO PROPS!!!!!!!", customer);

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