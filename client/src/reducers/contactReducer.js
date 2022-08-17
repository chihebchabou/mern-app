import {
  ADD_CONTACT,
  CLEAR_CURRENT,
  DELETE_CONTACT,
  SET_CURRENT,
  UPDATE_CONTACT,
} from '../actions/types';

const initialState = {
  contacts: [
    {
      id: 1,
      name: 'Jill Johnson',
      email: 'jill@gmail.com',
      phone: '111-111-1111',
      type: 'personal',
    },
    {
      id: 2,
      name: 'Sara Watson',
      email: 'sara@gmail.com',
      phone: '222-222-2222',
      type: 'personal',
    },
    {
      id: 3,
      name: 'Harry White',
      email: 'harry@gmail.com',
      phone: '333-333-3333',
      type: 'professional',
    },
  ],
  current: null,
};

const contactReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, payload],
      };

    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === payload.id ? payload : contact
        ),
      };

    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== payload),
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
    default:
      return state;
  }
};

export default contactReducer;
