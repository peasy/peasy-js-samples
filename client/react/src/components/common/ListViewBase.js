import React from 'react';
import toastr from 'toastr';

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
