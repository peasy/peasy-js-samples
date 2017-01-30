import React from 'react';
import { Link } from 'react-router';
import {bindActionCreators} from 'redux'
import CustomerActions from '../actions/customerActions';
import toastr from 'toastr';

let dispatch = null;
let customerActions = new CustomerActions();

const CustomersList = ({customers, dispatcher}) => {

  dispatch = dispatcher;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {customers.map(customerRow)}
      </tbody>
    </table>
  );

};

function destroy(id) {
  return function() {
    return dispatch(customerActions.destroy(id))
      .then(result => {
        if (!result.success) handleErrors(result.errors);
      });
  }
}

function handleErrors(errors) {
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

function customerRow(customer, index) {
  return (
    <tr key={index}>
      <td>
        <Link to={'/customer/' + customer.id }>{customer.name}</Link>
      </td>
      <td>
      <input className="btn btn-default btn-sm" 
        type="button" 
        onClick={destroy(customer.id)}
        value="Delete" />
      </td>
    </tr>
  );
}

export default CustomersList;