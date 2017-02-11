import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import constants from '../../constants';

let routes = constants.routes;

const Header = () => {
  return (
    <nav className="navbar navbar-inverse">
      <IndexLink to={routes.ROOT} activeClassName="active">Customers</IndexLink>
      {" | "}
      <Link to={ routes.ORDERS } activeClassName="active">Orders</Link>
      {" | "}
      <Link to={ routes.CATEGORIES } activeClassName="active">Categories</Link>
      {" | "}
      <Link to={ routes.PRODUCTS } activeClassName="active">Products</Link>
      {" | "}
      <Link to={ routes.INVENTORY_ITEMS } activeClassName="active">Inventory</Link>
    </nav>
  );
};

export default Header;