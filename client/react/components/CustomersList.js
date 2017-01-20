import React from 'react';

function customerRow(customer, index) {
  return <tr key={index}><td></td><td>{customer.name}</td></tr>;
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