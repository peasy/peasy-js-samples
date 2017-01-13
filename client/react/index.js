import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browerHistory } from 'react-router';
import routes from './routes';
import './styles/styles.css';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

console.log("FOOOOOOOOOOOOOOO");
render(
  <Router history={browserHistory} routes={routes} />,
    document.getElementById('app')
);