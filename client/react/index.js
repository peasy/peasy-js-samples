import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import ordersDotCom from '../businessLogic';
import * as customerActions from './actions/customerActions';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';

const store = configureStore();
store.dispatch(customerActions.loadCustomers());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('app')
);

( function( ordersDotCom ) {

  var proxy = new ordersDotCom.dataProxies.CustomerDataProxy();
  var service = new ordersDotCom.services.CustomerService(proxy);

  proxy.insert({}, (err, done) => {
    console.log("ERROR", err);
    console.log("DONE", done);
  });

  var command = service.getByIdCommand(1);
  command.execute((err, result) => {
    console.log("GET BY ID: ERROR: ", err);
    console.log("GET BY ID: result: ", result);
  });

  command = service.insertCommand({ name: "Aaron Hanusa" });
  command.execute((err, result) => {
    console.log("INSERT:", err);
    console.log("INSERT: result: ", result);
  });

  //var customer = { name: "Aaron Hanus" };
  //proxy.insert(customer, (err, result) => {
    //console.log("INSERT: ERROR: ", err);
    //console.log("INSERT: result: ", result);
    //proxy.getAll((err, result) => {
      //console.log("GET ALL: ERROR: ", err);
      //console.log("GET ALL: result: ", result);
      //result[1].name = "Aaron Hanusa";
      //proxy.update(result[1], (err, r) => {
        //console.log("UPDATE: ERROR: ", err);
        //console.log("UPDATE: result: ", r);
        //proxy.destroy(result.id, (err, result) => {
          //console.log("DELETE: ERROR: ", err);
          //console.log("DELETE: result: ", result);
          //proxy.getAll((err, result) => {
            //console.log("GET ALL: ERROR: ", err);
            //console.log("GET ALL: result: ", result);
          //});
        //});
      //});
    //});
  //});

} )( ordersDotCom );