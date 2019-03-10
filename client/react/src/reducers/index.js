import { combineReducers } from 'redux';
import customers from './customerReducer';
import categories from './categoryReducer';
import inventoryItems from './inventoryItemReducer';
import orders from './orderReducer';
import orderItems from './orderItemReducer';
import products from './productReducer';
import asyncInvocationsInProgress from './asyncStatusReducer'

const rootReducer = combineReducers({
  categories,
  customers,
  inventoryItems,
  orders,
  orderItems,
  products,
  asyncInvocationsInProgress
});

export default rootReducer;