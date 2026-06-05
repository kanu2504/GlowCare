import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const adminToken = localStorage.getItem('adminToken');
  const adminUserStr = localStorage.getItem('adminUser');
  
  let isAdmin = false;
  if (adminUserStr) {
    try {
      const parsed = JSON.parse(adminUserStr);
      isAdmin = parsed?.role === 'admin';
    } catch (e) {}
  }

  if (!adminToken || !isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
