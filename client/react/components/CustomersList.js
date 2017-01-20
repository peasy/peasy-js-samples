import React from 'react';
import { Link } from 'react-router';

function customerRow(customer, index) {
  return <tr key={index}>
           <td></td>
           <td><Link to={'/customer/' + customer.id }>{customer.name}</Link></td>
         </tr>;
}

const CustomersList = ({customers}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {customers.map(customerRow)}
      </tbody>
    </table>
  );
};

export default CustomersList;