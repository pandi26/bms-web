import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const authToken = sessionStorage.getItem('authToken');

  if (!authToken) {
    // Redirect to login page if no auth token is found
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
