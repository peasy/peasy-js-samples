import { combineReducers } from 'redux';
import customers from './customerReducer';
import categories from './categoryReducer';
import asyncInvocationsInProgress from './asyncStatusReducer'

const rootReducer = combineReducers({
  categories,
  customers,
  asyncInvocationsInProgress
});

export default rootReducer;