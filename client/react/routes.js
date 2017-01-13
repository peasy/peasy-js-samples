import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import CustomersView from './components/CustomersView';
import OrdersView from './components/OrdersView';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={CustomersView} />
    <Route path="/orders" component={OrdersView} />
  </Route>
);