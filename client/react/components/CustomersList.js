import React from 'react';
import { Link } from 'react-router';

function destroy(id) {
  return function() {
    console.log("ID", id);
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

const CustomersList = ({customers}) => {
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

export default CustomersList;