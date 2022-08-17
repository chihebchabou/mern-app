import { v4 } from 'uuid';
import {
  ADD_CONTACT,
  CLEAR_CURRENT,
  DELETE_CONTACT,
  SET_CURRENT,
  UPDATE_CONTACT,
} from './types';
// Add contact
export const addContact = contact => dispatch => {
  contact.id = v4();
  dispatch({ type: ADD_CONTACT, payload: contact });
};

// Delete Contact
export const deleteContact = id => dispatch => {
  dispatch({ type: DELETE_CONTACT, payload: id });
};

// Set Current Contact
export const setCurrent = contact => ({ type: SET_CURRENT, payload: contact });

// Clear Current Contact
export const clearCurrent = () => ({ type: CLEAR_CURRENT });

// Update Contact
export const updateContact = contact => dispatch => {
  dispatch({ type: UPDATE_CONTACT, payload: contact });
};
