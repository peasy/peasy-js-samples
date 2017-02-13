import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import OrderItemActions from '../../actions/orderItemActions';
import toastr from 'toastr';
import constants from '../../constants';
import OrderViewModel from '../../viewModels/orderViewModel';

let orderItemActions = new OrderItemActions();

class ListViewBase extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  _destroyAction(id) {}

  destroy(id) {
    var self = this;
    return function() {
      return self.props.dispatch(self._destroyAction(id))
        .then(result => {
          if (!result.success) self.handleErrors(result.errors);
        });
    }
  }

  handleErrors(errors) {
    if (Array.isArray(errors)) {
      toastr.error(errors[0].message);
    } else {
      toastr.error(errors.message);
    }
  }
}

export default ListViewBase;
