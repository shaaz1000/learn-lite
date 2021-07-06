import { combineReducers } from 'redux';
import CommonReducers from './commonReducer';
import PlanningReducer from './planning';
import UserReducer from './user'
const appReducer = combineReducers({
  CommonReducers,
  PlanningReducer,
  UserReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
