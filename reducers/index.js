import { combineReducers } from 'redux';
import waitersReducers from './waitersReducers';
import burgerQueenReducers from './burgerQueenReducers';

const rootReducer = combineReducers({
    waitersReducers,
    burgerQueenReducers
  });
  
  export default rootReducer;