import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/layout/MainLayout'; // Impor layout baru

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Application Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      
      {/* Grup rute terlindungi sekarang menggunakan MainLayout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Rute /scorecards akan menjadi 404 untuk saat ini, tapi kita akan buat nanti */}
          <Route path="/scorecards" element={<div>Scorecards Page</div>} /> 
        </Route>
      </Route>

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
