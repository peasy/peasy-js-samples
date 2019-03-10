import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductActions from '../../actions/productActions';
import InventoryItemActions from '../../actions/inventoryItemActions';
import constants from '../../constants';
import ListViewBase from '../../components/common/ListViewBase';

let productActions = new ProductActions();
let inventoryItemActions = new InventoryItemActions();

class ProductsView extends ListViewBase {

  constructor(props, context) {
    super(props, context);
    this.productRow = this.productRow.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Products</h1>
        {this.ProductsList()}
      </div>
    );
  }

  ProductsList() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th className="addButtonColumn">
              <Link className="btn btn-success btn-sm" to={`${constants.routes.PRODUCTS}/new`}>Create New</Link>
            </th>
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
        <td></td>
        <td>
          <Link to={`${constants.routes.PRODUCTS}/${product.id}`}>{product.name}</Link>
        </td>
        <td>
        <input className="btn btn-secondary btn-sm"
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
          if (!result.success) return self.handleErrors(result.errors);
          return self.props.dispatch(inventoryItemActions.loadData());
        });
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    products: state.products
  };
}

export default connect(mapStateToProps)(ProductsView);