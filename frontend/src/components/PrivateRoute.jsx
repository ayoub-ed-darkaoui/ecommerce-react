import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default PrivateRoute;

