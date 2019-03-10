import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CustomersView from './components/customer/CustomersView';
import CategoriesView from './components/category/CategoriesView';
import InventoryItemsView from './components/inventory/InventoryItemsView';
import ProductsView from './components/product/ProductsView';
import OrdersView from './components/order/OrdersView';
import ManageCustomer from './components/customer/ManageCustomer';
import ManageCategory from './components/category/ManageCategory';
import ManageOrder from './components/order/ManageOrder';
import ManageOrderItem from './components/orderItem/ManageOrderItem';
import ManageProduct from './components/product/ManageProduct';
import ManageInventoryItem from './components/inventory/ManageInventoryItem';
import constants from './constants';

let routes = constants.routes;

export default (
	<div>
		<Route exact path={ routes.ROOT }>
			<Redirect to={{ pathname: routes.ORDERS }} />
		</Route>
		<Route exact path={ routes.CATEGORIES } component={CategoriesView} />
		<Route exact path={ routes.CATEGORIES + '/:id' } component={ManageCategory} />
		<Route exact path={ routes.CUSTOMERS } component={CustomersView} />
		<Route exact path={ routes.CUSTOMERS + '/:id' } component={ManageCustomer} />
		<Route exact path={ routes.INVENTORY_ITEMS } component={InventoryItemsView} />
		<Route exact path={ routes.INVENTORY_ITEMS + '/:id' } component={ManageInventoryItem} />
		<Switch>
			<Route exact path={ routes.ORDERS } component={OrdersView} />
			<Route exact path={ routes.ORDERS + '/:id' } component={ManageOrder} />
			<Route exact path={ routes.ORDERS + '/:id/orderitems/:itemid'} component={ManageOrderItem} />
		</Switch>
		<Route exact path={ routes.PRODUCTS } component={ProductsView} />
		<Route exact path={ routes.PRODUCTS + '/:id' } component={ManageProduct} />
	</div>
);