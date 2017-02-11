import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CategoryActions from '../../actions/categoryActions';
import CategoryForm from './CategoryForm';
import toastr from 'toastr';
import ManageEntityBase from '../common/ManageEntityBase';
import constants from '../../constants';
import CategoryViewModel from '../../viewModels/categoryViewModel';

let categoryActions = new CategoryActions();

class ManageCategory extends ManageEntityBase {
  constructor(props, context) {
    console.log("CTOR IN MANAGE CATEGORY");
    super(props, context);
    this.state = {
      entity: this.props.entity,
      errors: [],
      saving: false
    };
  }

  componentWillReceiveProps(nextProps) {
      // console.log("SETTING STATE IN WILL RECEIVE PROPS");
      // this.setState({ entity: nextProps.entity });
    if (this.state.entity.entity.id !== nextProps.entity.entity.id) {
      console.log("SETTING STATE IN WILL RECEIVE PROPS");
      this.setState({ entity: nextProps.entity });
    }
  }

  _saveAction(entity) { 
    return categoryActions.save(entity.entity);
   }

  _redirectUri() {
    return constants.routes.CATEGORIES;
  }

  change(event) {
    const field = event.target.name;
    let entity = this.state.entity;
    entity.entity[field] = event.target.value;
    return this.setState({
      entity: entity,
      // clear errors associated with field until validation occurs again
      errors: this.state.errors.filter(e => e.association != field) 
    });
  };

  render() {
    return (
      <div>
        <h1>Manage Category</h1>
        <CategoryForm
          onCancel={this.cancel}
          onChange={this.change}
          onSave={this.save}
          category={this.state.entity}
          errors={this.state.errors}
          saving={this.state.saving} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log("MAP STATE TO PROPS");
  return {
    entity: new CategoryViewModel(ownProps.params.id, state.categories) 
  };
}

export default connect(mapStateToProps)(ManageCategory);