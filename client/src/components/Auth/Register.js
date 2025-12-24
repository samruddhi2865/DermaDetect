import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/authActions';
import { Navigate, Link } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [error, setError] = useState('');

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    dispatch(register({ name, email, password }));
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create your account</h2>
          <p>Set up your DermaDetect profile in a few seconds.</p>
        </div>

        {error && <div className="auth-alert auth-alert-error">{error}</div>}

        <form onSubmit={onSubmit} className="auth-form">
          <div className="form-group modern">
            <label htmlFor="register-name">Name</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                id="register-name"
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Your full name"
                required
              />
            </div>
          </div>

          <div className="form-group modern">
            <label htmlFor="register-email">Email</label>
            <div className="input-wrapper">
              <span className="input-icon">@</span>
              <input
                id="register-email"
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="form-group modern">
            <label htmlFor="register-password">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">•••</span>
              <input
                id="register-password"
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Create a secure password"
                required
              />
            </div>
          </div>

          <div className="form-group modern">
            <label htmlFor="register-password2">Confirm password</label>
            <div className="input-wrapper">
              <span className="input-icon">✓</span>
              <input
                id="register-password2"
                type="password"
                name="password2"
                value={password2}
                onChange={onChange}
                placeholder="Repeat your password"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn primary full-width">
            Register
          </button>
        </form>

        <div className="auth-footer">
          <span>Already have an account?</span>
          <Link to="/login" className="auth-link">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
