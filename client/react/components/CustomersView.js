import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CustomersList from './CustomersList';
import {browserHistory} from 'react-router';

class CustomersView extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.redirectToManageCustomer = this.redirectToManageCustomer.bind(this);
  }

  redirectToManageCustomer() {
    browserHistory.push('/customer');
  }

  render() {
    return (
      <div>
        <h1>Customers</h1>
        <input type="submit"
               value="Create New"
               className="btn btn-primary"
               onClick={this.redirectToManageCustomer} />
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