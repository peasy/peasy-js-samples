import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as customerActions from '../actions/customerActions';

class ManagerCustomer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>MANAGE CUSTOMER</div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(customerActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerCustomer);