// src/components/ProtectedRoute.jsx

import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
