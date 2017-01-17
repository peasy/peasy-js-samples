import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browerHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import './styles/styles.css';
import configureStore from './store/configureStore';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('aipp')
);