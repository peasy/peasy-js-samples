import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import CategoryActions from '../../actions/categoryActions';
import toastr from 'toastr';
import constants from '../../constants';
import ListViewBase from '../../components/common/ListViewBase';

class CategoriesView extends ListViewBase {

  constructor(props, context) {
    super(props, context);
    this.categoryRow = this.categoryRow.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Categories</h1>
        {this.CategoriesList()}
      </div>
    );
  }

  CategoriesList() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th className="addButtonColumn">
              <Link className="btn btn-success btn-xs" to={constants.routes.CATEGORY}>Create New</Link>
            </th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.categories.map(this.categoryRow)}
        </tbody>
      </table>
    );
  }

  categoryRow(category, index) {
    return (
      <tr key={index}>
        <td></td>
        <td>
          <Link to={constants.routes.CATEGORY + '/' + category.id }>{category.name}</Link>
        </td>
        <td>
          <input className="btn btn-default btn-sm" 
            type="button" 
            onClick={this.destroy(category.id)}
            value="Delete" />
        </td>
      </tr>
    );
  }

  _destroyAction(id) {
    return new CategoryActions().destroy(id);
  }
}


function mapStateToProps(state, ownProps) {
  return {
    categories: state.categories
  };
}

export default connect(mapStateToProps)(CategoriesView);