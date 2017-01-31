import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CustomerActions from '../../actions/customerActions';
import CustomerForm from '../customer/CustomerForm';
import toastr from 'toastr';

let customerActions = new CustomerActions();

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

  cancel() {
    this.context.router.push('/');
  }

  save(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.dispatch(customerActions.save(this.state.entity))
      .then((result) => {
        this.setState({saving: false});
        if (!result.success) return this.handleErrors(result.errors);
        toastr.success("Customer saved");
        this.context.router.push('/');
      });
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


export default ManageEntityBase;
// export default connect(mapStateToProps)(ManageEntityBase);