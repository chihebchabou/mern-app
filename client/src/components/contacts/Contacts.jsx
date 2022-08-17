import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import ContactItem from './ContactItem';

const Contacts = () => {
  const { contacts } = useSelector(state => state.contactReducer);

  return (
    <Fragment>
      {contacts.map(contact => (
        <ContactItem contact={contact} />
      ))}
    </Fragment>
  );
};

export default Contacts;
