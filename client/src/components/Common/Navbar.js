import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';
import './Navbar.css';
import logo from '../../images/logo192.png';

const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const guestLinks = (
    <>
      <Link to="/about">About</Link>
      <Link to="/blog">Blog</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </>
  );

  const authLinks = (
    <>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/predict">Predict</Link>
      <Link to="/records">Records</Link>
      <Link to="/profile">Profile</Link>
      {auth.user && auth.user.role === 'admin' && (
        <Link to="/create-blog">Create Blog</Link>
      )}
      <Link to="/" onClick={handleLogout}>
        Logout
      </Link>
    </>
  );

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/about">
          <img src={logo} alt="DermaDetect logo" className="navbar-logo" />
          <span>
            Derma<span className="accent">Detect</span>
          </span>
        </Link>
      </div>
      <div className="navbar-links">
        {auth.isAuthenticated ? authLinks : guestLinks}
      </div>
    </nav>
  );
};

export default Navbar;
