import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import CustomerActions from '../../actions/customerActions';
import toastr from 'toastr';
import constants from '../../constants';

let customerActions = new CustomerActions();

class CustomersView extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.customerRow = this.customerRow.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Customers</h1>
        <Link to={constants.routes.CUSTOMER}>Create New</Link>
        {this.customersList()}
      </div>
    );
  }

  customersList() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.customers.map(this.customerRow)}
        </tbody>
      </table>
    );
  }

  customerRow(customer, index) {
    return (
      <tr key={index}>
        <td>
          <Link to={ constants.routes.CUSTOMER + '/' + customer.id }>{customer.name}</Link>
        </td>
        <td>
        <input className="btn btn-default btn-sm" 
          type="button" 
          onClick={this.destroy(customer.id)}
          value="Delete" />
        </td>
      </tr>
    );
  }

  destroy(id) {
    var self = this;
    return function() {
      return self.props.dispatch(customerActions.destroy(id))
        .then(result => {
          if (!result.success) self.handleErrors(result.errors);
        });
    }
  }

  handleErrors(errors) {
    if (Array.isArray(errors)) {
      var validationErrors = errors.filter(e => e.association);
      if (validationErrors.length > 0) {
        this.setState({errors: validationErrors})
      }
      var allOthers = errors.filter(e => !e.association);
      allOthers.map(e => e.message).forEach(e => toastr.error(e));
    } else {
      toastr.error(errors.message);
    }
  }
}


function mapStateToProps(state, ownProps) {
  return {
    customers: state.customers
  };
}

export default connect(mapStateToProps)(CustomersView);