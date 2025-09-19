import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import WorkoutScreen from './pages/WorkoutScreen';
import WorkoutSummary from './pages/WorkoutSummary';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignUp />} />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={<ProtectedRoute user={user}><Dashboard /></ProtectedRoute>}
      />
      {/* La ruta a WorkoutScreen ya no necesita un ID dinámico */}
      <Route 
        path="/workout" 
        element={<ProtectedRoute user={user}><WorkoutScreen /></ProtectedRoute>}
      />
      <Route 
        path="/workout-summary" 
        element={<ProtectedRoute user={user}><WorkoutSummary /></ProtectedRoute>}
      />

    </Routes>
  );
};

export default App;
