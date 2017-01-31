import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import ProductActions from '../../actions/productActions';
import toastr from 'toastr';

let productActions = new ProductActions();

class ProductsView extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.productRow = this.productRow.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Products</h1>
        <Link to="/product">Create New</Link>
        {this.ProductsList()}
      </div>
    );
  }

  ProductsList() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.products.map(this.productRow)}
        </tbody>
      </table>
    );
  }

  productRow(product, index) {
    return (
      <tr key={index}>
        <td>
          <Link to={'/product/' + product.id }>{product.name}</Link>
        </td>
        <td>
        <input className="btn btn-default btn-sm" 
          type="button" 
          onClick={this.destroy(product.id)}
          value="Delete" />
        </td>
      </tr>
    );
  }

  destroy(id) {
    var self = this;
    return function() {
      return self.props.dispatch(productActions.destroy(id))
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
    products: state.products
  };
}

export default connect(mapStateToProps)(ProductsView);