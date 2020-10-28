import { combineReducers } from 'redux';
import global from './global';
import krt from './krt';

const allReducers = combineReducers({
  global,
  krt,
});

export default allReducers;
