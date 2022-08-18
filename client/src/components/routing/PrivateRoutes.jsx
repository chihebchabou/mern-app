import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  const { isAuthenticated, loading } = useSelector(state => state.authReducer);
  return isAuthenticated && !loading ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
