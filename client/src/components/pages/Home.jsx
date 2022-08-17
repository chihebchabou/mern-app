import React from 'react';
import ContactForm from '../contacts/ContactForm';
import Contacts from '../contacts/Contacts';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <ContactForm />
        </div>
        <div className="col">
          <Contacts />
        </div>
      </div>
    </div>
  );
};

export default Home;
