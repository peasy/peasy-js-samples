import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CustomersList from './CustomersList';
import {Link} from 'react-router';

class CustomersView extends React.Component {

  render() {
    return (
      <div>
        <h1>Customers</h1>
        <Link to="/customer">Create New</Link>
        <CustomersList 
          customers={this.props.customers} 
          dispatcher={this.props.dispatch}
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