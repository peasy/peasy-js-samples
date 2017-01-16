import { combineReducers } from 'redux';
import customers from './customerReducer';

const rootReducer = combineReducers({
  customers
});

export default rootReducer;