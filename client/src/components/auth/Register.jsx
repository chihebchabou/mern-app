import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAlert } from '../../actions/alertActions';
import { clearAlert, clearErrors, register } from '../../actions/authActions';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { error, isAuthenticated } = useSelector(state => state.authReducer);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

    if (error && error.msg === 'user already exists') {
      dispatch(setAlert(error.msg, 'danger'));
      dispatch(clearErrors());
    }
  }, [error, isAuthenticated]);

  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      dispatch(setAlert('Please enter all fileds', 'danger'));
    } else if (password !== password2) {
      dispatch(setAlert('Passwords do not match', 'danger'));
    } else {
      dispatch(register({ name, email, password }));
    }
  };
  return (
    <div className="pt-5">
      <h1 className="text-center">
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={onChange}
            id="name"
            aria-describedby="emailHelp"
            placeholder="Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={onChange}
            id="email"
            aria-describedby="emailHelp"
            placeholder="Email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={onChange}
            id="password"
            aria-describedby="emailHelp"
            placeholder="Password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password2"
            value={password2}
            onChange={onChange}
            id="password2"
            aria-describedby="emailHelp"
            placeholder="Confirm Password"
          />
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
