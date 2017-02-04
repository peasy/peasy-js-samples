import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Customers</IndexLink>
      {" | "}
      <Link to="/orders" activeClassName="active">Orders</Link>
      {" | "}
      <Link to="/categories" activeClassName="active">Categories</Link>
      {" | "}
      <Link to="/products" activeClassName="active">Products</Link>
      {" | "}
      <Link to="/inventoryItems" activeClassName="active">Inventory</Link>
    </nav>
  );
};

export default Header;