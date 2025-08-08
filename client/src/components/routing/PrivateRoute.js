import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector(state => state.auth);

  if (loading) return null; // Or a spinner

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
