import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { clearProfile } from '../../features/profile/profileSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(state => state.auth);

  const onLogout = () => {
    dispatch(clearProfile());
    dispatch(logout());
  };

  const authLinks = (
    <ul>
      <li><Link to="/profiles"><i className='fas fa-users'></i> {" "} <span className='hide-sm'></span>Developers</Link></li>
      <li><Link to="/posts">My Posts</Link></li>
      <li><Link to="/all-posts">All Posts</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li>
        <button onClick={onLogout} className="btn btn-link">
          <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
        </button>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li><Link to="/profiles">Developers</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      {!loading && (isAuthenticated ? authLinks : guestLinks)}
    </nav>
  );
};

export default Navbar;
