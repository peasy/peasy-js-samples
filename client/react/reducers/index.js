import { combineReducers } from 'redux';
import customers from './customerReducer';
import asyncInvocationsInProgress from './asyncStatusReducer'

const rootReducer = combineReducers({
  customers,
  asyncInvocationsInProgress
});

export default rootReducer;