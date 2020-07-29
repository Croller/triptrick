import { combineReducers } from 'redux';
import user from './user';
import execution from './execution';

const allReducers = combineReducers({
  user,
  execution,
});

export default allReducers;
