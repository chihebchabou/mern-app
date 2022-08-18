import React from 'react';
import { useDispatch } from 'react-redux';
import {
  setCurrent,
  deleteContact,
  clearCurrent,
} from '../../actions/contactActions';

const ContactItem = ({ contact }) => {
  const { _id, name, email, phone, type } = contact;
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteContact(_id));
    dispatch(clearCurrent());
  };

  return (
    <div className="card mt-3" style={{ width: '100%' }}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        {/* <p className="card-text"> */}
        <span
          style={{ float: 'right' }}
          className={`badge ${
            type === 'professional' ? 'bg-success' : 'bg-primary'
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
        {/* </p> */}
        <p className="card-text">
          {email && (
            <span>
              <i className="fas fa-envelope-open"></i> {email}
            </span>
          )}
        </p>
        <p className="card-text">
          {phone && (
            <span>
              <i className="fas fa-envelope-open"></i> {phone}
            </span>
          )}
        </p>
        <button
          className="btn btn-secondary me-3"
          onClick={() => {
            dispatch(setCurrent(contact));
          }}
        >
          Edit
        </button>
        <button className="btn btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactItem;
