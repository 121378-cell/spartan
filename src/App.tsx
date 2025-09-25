
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import WorkoutScreen from './pages/WorkoutScreen';
import WorkoutSummary from './pages/WorkoutSummary';
import NutritionPage from './pages/Nutrition';
import WorkoutHistory from './pages/WorkoutHistory';
import AchievementsPage from './pages/AchievementsPage';
import UserProfilePage from './pages/UserProfilePage';
import LeaderboardPage from './pages/LeaderboardPage';
import ChatPage from './pages/ChatPage';
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
      <Route 
        path="/nutrition" 
        element={<ProtectedRoute user={user}><NutritionPage /></ProtectedRoute>}
      />
      <Route 
        path="/workout" 
        element={<ProtectedRoute user={user}><WorkoutScreen /></ProtectedRoute>}
      />
      <Route 
        path="/workout-summary" 
        element={<ProtectedRoute user={user}><WorkoutSummary /></ProtectedRoute>}
      />
      <Route 
        path="/workout-history" 
        element={<ProtectedRoute user={user}><WorkoutHistory /></ProtectedRoute>}
      />
      <Route 
        path="/achievements" 
        element={<ProtectedRoute user={user}><AchievementsPage /></ProtectedRoute>}
      />
      <Route 
        path="/profile/:uid" 
        element={<ProtectedRoute user={user}><UserProfilePage /></ProtectedRoute>}
      />
      <Route 
        path="/leaderboard" 
        element={<ProtectedRoute user={user}><LeaderboardPage /></ProtectedRoute>}
      />
      <Route 
        path="/chat" 
        element={<ProtectedRoute user={user}><ChatPage /></ProtectedRoute>}
      />

    </Routes>
  );
};

export default App;
