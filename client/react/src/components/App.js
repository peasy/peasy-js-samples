import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'

class App extends React.Component {
  getStyle() {
    var style = this.props.isBusy ? {} : { display: 'none' };
    return style;
  }

  render() {
		console.log('FOOOOOOOOOOOOOO', this.props.children)
    return (
      <div className="container-fluid">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

// App.propTypes = {
//   children: PropTypes.object.isRequired
// };

function mapStateToProps(state, ownProps) {
  return {
    isBusy: state.asyncInvocationsInProgress > 0
  };
}

export default withRouter(connect(mapStateToProps)(App));