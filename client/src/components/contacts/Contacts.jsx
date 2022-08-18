import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from '../../actions/contactActions';
import ContactItem from './ContactItem';

const Contacts = () => {
  const { contacts, loading } = useSelector(state => state.contactReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, []);

  if (contacts.length === 0 && !loading) {
    return <h3 className="text-center">Please add a contact</h3>;
  }
  return (
    <Fragment>
      {contacts.map(contact => (
        <ContactItem contact={contact} key={contact._id} />
      ))}
    </Fragment>
  );
};

export default Contacts;
