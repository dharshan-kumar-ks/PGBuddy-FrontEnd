import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, allowedRoles }) {
  const userRole = localStorage.getItem('userRole'); // Retrieve user role from localStorage

  if (!allowedRoles.includes(userRole)) {
    // Redirect based on user role if access is denied
    if (userRole === 'RESIDENT') {
      return <Navigate to="/home" />;
    } else if (userRole === 'ADMIN') {
      return <Navigate to="/admin-notice-page" />;
    }
  }

  // If the user's role is allowed, render the children (protected component)
  return children;
}

export default ProtectedRoute;