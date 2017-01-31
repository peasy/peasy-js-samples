import { combineReducers } from 'redux';
import customers from './customerReducer';
import categories from './categoryReducer';
import products from './productReducer';
import asyncInvocationsInProgress from './asyncStatusReducer'

const rootReducer = combineReducers({
  categories,
  customers,
  products,
  asyncInvocationsInProgress
});

export default rootReducer;