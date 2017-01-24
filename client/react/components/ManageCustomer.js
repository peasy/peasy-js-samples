import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as customerActions from '../actions/customerActions';
import CustomerForm from './CustomerForm';

class ManagerCustomer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      customer: Object.assign({}, props.customer),
      errors: {}
    };
    this.change = this.change.bind(this);
  }

  save() {
    console.log("SAVE");
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

function mapStateToProps(state, ownProps) {
  return {
    customer: { name: "foo jones" }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(customerActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerCustomer);