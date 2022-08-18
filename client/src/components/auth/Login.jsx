import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAlert } from '../../actions/alertActions';
import { clearErrors, login } from '../../actions/authActions';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector(state => state.authReducer);
  const [user, setUser] = useState({ email: '', password: '' });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

    if (error && error.msg === 'Invalid Credentials') {
      dispatch(setAlert(error.msg, 'danger'));
      dispatch(clearErrors());
    }
  }, [error, isAuthenticated]);

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      dispatch(setAlert('Please enter all fileds', 'danger'));
    } else {
      dispatch(login({ email, password }));
    }
  };
  return (
    <div className="pt-5">
      <h1 className="text-center">
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
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
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
