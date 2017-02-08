import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import toastr from 'toastr';
import ConcurrencyError from '../../../../business_logic/shared/concurrencyError';

class ManageEntityBase extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      entity: Object.assign({}, props.entity),
      errors: [],
      saving: false
    };
    this.cancel = this.cancel.bind(this);
    this.change = this.change.bind(this);
    this.save = this.save.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.entity.id != nextProps.entity.id) {
      this.setState({entity: Object.assign({}, nextProps.entity)});
    }
  }

  _redirectUri(entity) { }

  _saveAction(entity) { }

  cancel() {
    this.context.router.push(this._redirectUri());
  }

  save(event) {
    event.preventDefault();
    this.setState({saving: true});
    return this.props.dispatch(this._saveAction(this.state.entity))
      .then((result) => {
        this.setState({saving: false});
        if (!result.success) return this.handleErrors(result.errors);
        toastr.success("Save successful");
        var redirectUri = this._redirectUri(result.value);
        if (redirectUri) {
          this.context.router.push(redirectUri);
        }
        return result;
      })
      .catch((e) => {
        this.setState({saving: false});
        this.handleErrors(e);
      });
  }

  handleErrors(errors) {
    if (Array.isArray(errors)) {
      var exclusionList = ['amount'];
      var validationErrors = errors.filter(e => e.association && exclusionList.indexOf(e.association) === -1);
      if (validationErrors.length > 0) {
        this.setState({errors: validationErrors})
      }
      var allOthers = errors.filter(e => !e.association || exclusionList.indexOf(e.association) > -1);
      allOthers.map(e => e.message).forEach(e => toastr.error(e));
    } else {
      if (errors instanceof ConcurrencyError) {
        errors.message = "Please refresh your data and try again";
      }
      toastr.error(errors.message);
    }
  }

  change(event) {
    const field = event.target.name;
    let entity = this.state.entity;
    entity[field] = event.target.value;
    return this.setState({
      entity: entity,
      // clear errors associated with field until validation occurs again
      errors: this.state.errors.filter(e => e.association != field) 
    });
  };
}

ManageEntityBase.contextTypes = {
  router: PropTypes.object
};

export default ManageEntityBase;