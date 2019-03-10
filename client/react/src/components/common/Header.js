import React from 'react';
import { NavLink } from 'react-router-dom';
import constants from '../../constants';

let routes = constants.routes;

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<ul className="navbar-nav mr-auto">
				<li className="nav-item">
					<NavLink to={routes.ORDERS} className="nav-link" activeClassName="active">Orders</NavLink>
				</li>
				<li className="nav-item">
					<NavLink to={ routes.CUSTOMERS } className="nav-link" activeClassName="active">Customers</NavLink>
				</li>
				<li className="nav-item">
					<NavLink to={ routes.CATEGORIES } className="nav-link" activeClassName="active">Categories</NavLink>
				</li>
				<li className="nav-item">
					<NavLink to={ routes.PRODUCTS } className="nav-link" activeClassName="active">Products</NavLink>
				</li>
				<li className="nav-item">
					<NavLink to={ routes.INVENTORY_ITEMS } className="nav-link" activeClassName="active">Inventory</NavLink>
				</li>
			</ul>
    </nav>
  );
};

export default Header;