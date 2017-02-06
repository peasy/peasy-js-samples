import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import CustomersView from './components/customer/CustomersView';
import CategoriesView from './components/category/CategoriesView';
import InventoryItemsView from './components/inventory/InventoryItemsView';
import ProductsView from './components/product/ProductsView';
import OrdersView from './components/OrdersView';
import ManageCustomer from './components/customer/ManageCustomer';
import ManageCategory from './components/category/ManageCategory';
import ManageProduct from './components/product/ManageProduct';
import ManageInventoryItem from './components/inventory/ManageInventoryItem';
import constants from './constants';

let routes = constants.routes;

export default (
  <Route path={routes.ROOT} component={App}>
    <IndexRoute component={CustomersView} />
    <Route path={ routes.ORDERS } component={OrdersView} />
    <Route path={ routes.CATEGORIES } component={CategoriesView} />
    <Route path={ routes.CATEGORY } component={ManageCategory} />
    <Route path={ routes.CATEGORY + '/:id' } component={ManageCategory} />
    <Route path={ routes.CUSTOMER } component={ManageCustomer} />
    <Route path={ routes.CUSTOMER + '/:id' } component={ManageCustomer} />
    <Route path={ routes.INVENTORY_ITEMS } component={InventoryItemsView} />
    <Route path={ routes.INVENTORY_ITEM + '/:id' } component={ManageInventoryItem} />
    <Route path={ routes.PRODUCTS } component={ProductsView} />
    <Route path={ routes.PRODUCT } component={ManageProduct} />
    <Route path={ routes.PRODUCT + '/:id' } component={ManageProduct} />
  </Route>
);