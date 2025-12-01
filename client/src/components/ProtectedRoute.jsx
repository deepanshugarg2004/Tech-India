import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // Redirect based on role
    if (role === 'student') {
      return <Navigate to="/student-dashboard" replace />;
    } else if (role === 'recruiter') {
      return <Navigate to="/recruiter-dashboard" replace />;
    } else if (role === 'mentor') {
      return <Navigate to="/mentor-dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

