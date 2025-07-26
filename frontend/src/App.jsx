import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';
import CreateScorecard from './pages/CreateScorecard';
import ScorecardListPage from './pages/ScorecardListPage';
import EditScorecard from './pages/EditScorecard'; // Impor halaman Edit

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Application Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scorecards" element={<ScorecardListPage />} /> 
          <Route path="/scorecards/create" element={<CreateScorecard />} />
          {/* Route baru untuk halaman edit dengan parameter ID */}
          <Route path="/scorecards/:id/edit" element={<EditScorecard />} />
        </Route>
      </Route>

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
