import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/authActions';
import { Navigate, Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const alerts = useSelector(state => state.alert);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome back</h2>
          <p>Log in to monitor and manage your skin health.</p>
        </div>

        {alerts &&
          alerts.map(alert => (
            <div
              key={alert.id}
              className={`auth-alert auth-alert-${alert.alertType}`}
            >
              {alert.msg}
            </div>
          ))}

        <form onSubmit={onSubmit} className="auth-form">
          <div className="form-group modern">
            <label htmlFor="login-email">Email</label>
            <div className="input-wrapper">
              <span className="input-icon">@</span>
              <input
                id="login-email"
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
            <label htmlFor="login-password">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">•••</span>
              <input
                id="login-password"
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn primary full-width">
            Login
          </button>
        </form>

        <div className="auth-footer">
          <span>New to DermaDetect?</span>
          <Link to="/register" className="auth-link">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
