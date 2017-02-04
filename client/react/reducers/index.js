import { combineReducers } from 'redux';
import customers from './customerReducer';
import categories from './categoryReducer';
import inventoryItems from './inventoryItemReducer';
import products from './productReducer';
import asyncInvocationsInProgress from './asyncStatusReducer'

const rootReducer = combineReducers({
  categories,
  customers,
  inventoryItems,
  products,
  asyncInvocationsInProgress
});

export default rootReducer;