import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import CustomersView from './components/CustomersView';
import OrdersView from './components/OrdersView';
import ManageCustomer from './components/ManageCustomer';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={CustomersView} />
    <Route path="/orders" component={OrdersView} />
    <Route path="/customer" component={ManageCustomer} />
    <Route path="/customer/:id" component={ManageCustomer} />
  </Route>
);