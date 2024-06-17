import {combineReducers} from '@reduxjs/toolkit';
import loginReducer from '../reducers/login';
import welcomeScreen from '../reducers/welcome';
const reducers = combineReducers({
  login: loginReducer,
  welcomeScreen: welcomeScreen,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return reducers(undefined, action);
  }
  return reducers(state, action);
};

export default rootReducer;
