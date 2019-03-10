import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomerActions from '../../actions/customerActions';
import constants from '../../constants';
import ListViewBase from '../../components/common/ListViewBase';

class CustomersView extends ListViewBase {

  constructor(props, context) {
    super(props, context);
    this.customerRow = this.customerRow.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Customers</h1>
        {this.customersList()}
      </div>
    );
  }

  customersList() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th className="addButtonColumn">
              <Link className="btn btn-success btn-sm" to={`${constants.routes.CUSTOMERS}/new`}>Create New</Link>
            </th>
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
        <td></td>
        <td>
          <Link to={`${constants.routes.CUSTOMERS}/${customer.id}`}>{customer.name}</Link>
        </td>
        <td>
					<input className="btn btn-secondary btn-sm"
						type="button"
						onClick={this.destroy(customer.id)}
						value="Delete" />
				</td>
      </tr>
    );
  }

  _destroyAction(id) {
    return new CustomerActions().destroy(id);
  }
}


function mapStateToProps(state, ownProps) {
  return {
    customers: state.customers
  };
}

export default connect(mapStateToProps)(CustomersView);