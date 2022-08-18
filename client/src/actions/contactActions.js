import { v4 } from 'uuid';
import axios from 'axios';
import {
  ADD_CONTACT,
  CLEAR_CURRENT,
  CONTACT_ERROR,
  DELETE_CONTACT,
  GET_CONTACTS,
  SET_CURRENT,
  UPDATE_CONTACT,
} from './types';

// Get contact
export const getContacts = () => async dispatch => {
  if (localStorage.token) {
    var config = {
      headers: {
        'x-auth-token': localStorage.token,
      },
    };
  }

  try {
    const res = await axios.get('/api/contacts', config);
    dispatch({ type: GET_CONTACTS, payload: res.data });
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.data });
  }
};

// Add contact
export const addContact = contact => async dispatch => {
  // contact.id = v4();
  if (localStorage.token) {
    var config = {
      headers: {
        'x-auth-token': localStorage.token,
        'Content-Type': 'application/json',
      },
    };
  }

  try {
    const res = await axios.post('/api/contacts', contact, config);
    dispatch({ type: ADD_CONTACT, payload: res.data });
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.data });
  }
};

// Delete Contact
export const deleteContact = id => async dispatch => {
  if (localStorage.token) {
    var config = {
      headers: {
        'x-auth-token': localStorage.token,
      },
    };
  }

  try {
    await axios.delete(`/api/contacts/${id}`, config);
    dispatch({ type: DELETE_CONTACT, payload: id });
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.data });
  }
};

// Set Current Contact
export const setCurrent = contact => ({ type: SET_CURRENT, payload: contact });

// Clear Current Contact
export const clearCurrent = () => ({ type: CLEAR_CURRENT });

// Update Contact
export const updateContact = contact => async dispatch => {
  console.log(contact);
  if (localStorage.token) {
    var config = {
      headers: {
        'x-auth-token': localStorage.token,
        'Content-Type': 'application/json',
      },
    };
  }

  try {
    const res = await axios.put(
      `/api/contacts/${contact._id}`,
      contact,
      config
    );

    dispatch({ type: UPDATE_CONTACT, payload: res.data });
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.data });
  }
};
