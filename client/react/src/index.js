// import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import ordersDotCom from './businessLogic';
import CustomerActions from './actions/customerActions';
import CategoryActions from './actions/categoryActions';
import OrderActions from './actions/orderActions';
import OrderItemActions from './actions/orderItemActions';
import ProductActions from './actions/productActions';
import InventoryItemActions from './actions/inventoryItemActions';
import Header from './components/common/Header';
import '../node_modules/toastr/build/toastr.min.css';
import './index.css';

const store = configureStore();
const customerActions = new CustomerActions();
const categoryActions = new CategoryActions();
const orderActions = new OrderActions();
const orderItemActions = new OrderItemActions();
const productActions = new ProductActions();
const inventoryItemActions = new InventoryItemActions();

store.dispatch(productActions.loadData());
store.dispatch(customerActions.loadData());
store.dispatch(categoryActions.loadData());
store.dispatch(inventoryItemActions.loadData());
store.dispatch(orderActions.loadData());
store.dispatch(orderItemActions.loadData());

render(
  <Provider store={store}>
    <Router>
			<div>
				<Header />
				<div className="main-content">
				{ routes }
				</div>
			</div>
		</Router>
  </Provider>, document.getElementById('app')
);

( function( ordersDotCom ) {

} )( ordersDotCom );