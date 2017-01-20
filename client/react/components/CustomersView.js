import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CustomersList from './CustomersList';

class CustomersView extends React.Component {

  render() {
    return (
      <div>
        <h1>Customers</h1>
        <CustomersList customers={this.props.customers} />
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