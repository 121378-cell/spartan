import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';
import { Loader } from '@mantine/core';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
