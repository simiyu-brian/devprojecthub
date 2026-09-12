import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface RoleRouteProps {
  allow: 'student' | 'admin';
}

export function RoleRoute({ allow }: RoleRouteProps) {
  const { role } = useAuth();

  if (role !== allow) {
    // Signed in, but the wrong role for this area — send them to their own dashboard
    // rather than a dead end.
    const fallback = role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
}
