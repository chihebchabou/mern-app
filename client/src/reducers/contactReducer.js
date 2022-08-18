import {
  ADD_CONTACT,
  CLEAR_CURRENT,
  CONTACT_ERROR,
  DELETE_CONTACT,
  GET_CONTACTS,
  SET_CURRENT,
  UPDATE_CONTACT,
} from '../actions/types';

const initialState = {
  contacts: [],
  current: null,
};

const contactReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: payload,
        loading: false,
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, payload],
        loading: false,
      };

    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact._id === payload._id ? payload : contact
        ),
        loading: false,
      };

    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact._id !== payload),
        loading: false,
      };

    case SET_CURRENT:
      return {
        ...state,
        current: payload,
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };

    case CONTACT_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default contactReducer;
