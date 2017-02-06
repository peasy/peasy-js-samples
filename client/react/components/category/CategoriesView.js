import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import CategoryActions from '../../actions/categoryActions';
import toastr from 'toastr';
import constants from '../../constants';

let categoryActions = new CategoryActions();

class CategoriesView extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.categoryRow = this.categoryRow.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Categories</h1>
        <Link to={constants.routes.CATEGORY}>Create New</Link>
        {this.CategoriesList()}
      </div>
    );
  }

  CategoriesList() {
    return (
      <table className="table">
        <thead>
          <tr>
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

  destroy(id) {
    var self = this;
    return function() {
      return self.props.dispatch(categoryActions.destroy(id))
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
    categories: state.categories
  };
}

export default connect(mapStateToProps)(CategoriesView);