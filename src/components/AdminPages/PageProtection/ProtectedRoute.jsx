import React from 'react';
import { Navigate } from 'react-router-dom';

// Renders the ProtectedRoute component to restrict access to certain routes based on user roles.
// Takes children (protected component) and allowedRoles as input and returns the children if access is allowed, otherwise redirects.
function ProtectedRoute({ children, allowedRoles }) {
  const userRole = localStorage.getItem('userRole'); // Retrieve user role from localStorage.

  if (!allowedRoles.includes(userRole)) {
    // Redirect based on user role if access is denied.
    if (userRole === 'RESIDENT') {
      return <Navigate to="/home" />; // Redirect residents to the home page.
    } else if (userRole === 'ADMIN') {
      return <Navigate to="/admin-notice-page" />; // Redirect admins to the admin notice page.
    }
  }

  // If the user's role is allowed, render the children (protected component).
  return children;
}

export default ProtectedRoute;