import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as customerActions from '../actions/customerActions';

class CustomersView extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onNameChange = this.onNameChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.customerRow = this.customerRow.bind(this);
    this.state = {
      customer: { name: "" }
    };
  }

  onNameChange(event) {
    const customer = this.state.customer;
    customer.name = event.target.value;
    this.setState({ customer: customer });
  }

  onSave() {
    this.props.dispatch(customerActions.createCustomer(this.state.customer));
    // console.log(`Saving ${this.state.customer.name}`);
  }

  customerRow(customer, index) {
    return <div key={index}>customer.name</div>;
  }

  render() {
    return (
      <div>
        <h1>Customers</h1>
        <h2>Add customer</h2>
        <input 
          type="text"
          onChange={this.onNameChange}
          value={this.state.customer.name}
          />
        <input 
          type="submit"
          onClick={this.onSave}
          value="Save"
          />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    customers: state.customers
  };
}

export default connect(mapStateToProps)(CustomersView);
// export default CustomersView;
