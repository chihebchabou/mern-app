import { combineReducers } from 'redux';

import contactReducer from './contactReducer';
import alertReducer from './alertReducer';
import authReducer from './authReducer';

export default combineReducers({ contactReducer, authReducer, alertReducer });
