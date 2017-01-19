import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class CustomersView extends React.Component {

  customerRow(customer, index) {
    return <div key={index}>{customer.name}</div>;
  }

  render() {
    return (
      <div>
        <h1>Customers</h1>
        {this.props.customers.map(this.customerRow)}
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