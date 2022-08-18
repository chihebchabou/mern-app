import {
  AUTH_ERROR,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from './types';
import axios from 'axios';
// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    var config = {
      headers: { 'x-auth-token': localStorage.token },
    };
  }

  try {
    const res = await axios.get('/api/auth', config);
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register user
export const register = formData => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  try {
    const res = await axios.post('/api/users', formData, config);

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: REGISTER_FAIL, payload: err.response.data });
  }
};

// Login User
export const login = formData => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const res = await axios.post('/api/auth', formData, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: LOGIN_FAIL, payload: err.response.data });
  }
};

// Logout
export const logout = () => {
  return { type: LOGOUT };
};

// Clear Errors
export const clearErrors = () => ({ type: CLEAR_ERRORS });
