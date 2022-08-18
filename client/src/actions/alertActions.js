import { v4 } from 'uuid';
import { REMOVE_ALERT, SET_ALERT } from './types';

// Set alert
export const setAlert = (msg, type) => dispatch => {
  const id = v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, type, id },
  });

  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT, payload: id });
  }, 5000);
};
