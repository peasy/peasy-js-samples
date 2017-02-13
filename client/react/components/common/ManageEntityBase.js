import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import toastr from 'toastr';
import ConcurrencyError from '../../../../business_logic/shared/concurrencyError';

class ManageEntityBase extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      viewModel: this.props.viewModel,
      errors: [],
      saving: false
    };
    this.cancel = this.cancel.bind(this);
    this.change = this.change.bind(this);
    this.save = this.save.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.viewModel.entity.id !== nextProps.viewModel.entity.id) {
      this.setState({ viewModel: nextProps.viewModel });
    }
  }

  _redirectUri() { }

  _saveAction(viewModel) { }

  cancel() {
    this.context.router.push(this._redirectUri());
  }

  save(event) {
    event.preventDefault();
    this.setState({saving: true});
    return this.props.dispatch(this._saveAction(this.state.viewModel))
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
    let viewModel = this.state.viewModel;
    viewModel[field] = event.target.value;
    return this.setState({
      viewModel: viewModel,
      // clear errors associated with field until validation occurs again
      errors: this.state.errors.filter(e => e.association != field) 
    });
  };

}

ManageEntityBase.contextTypes = {
  router: PropTypes.object
};

export default ManageEntityBase;