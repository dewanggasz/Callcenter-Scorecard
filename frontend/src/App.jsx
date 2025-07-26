import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';
import CreateScorecard from './pages/CreateScorecard';
import ScorecardListPage from './pages/ScorecardListPage';
import EditScorecard from './pages/EditScorecard';
import ImportPage from './pages/ImportPage';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Application Loading...</div>;
  }

  return (
    <Routes>
      {/* Rute utama, mengarahkan ke dasbor jika sudah login, atau ke halaman login jika belum */}
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      
      {/* Rute publik untuk login */}
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      
      {/* Grup rute yang dilindungi, memerlukan login */}
      <Route element={<ProtectedRoute />}>
        {/* Semua rute di dalam sini akan menggunakan MainLayout (Sidebar & Header) */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scorecards" element={<ScorecardListPage />} /> 
          <Route path="/scorecards/create" element={<CreateScorecard />} />
          <Route path="/scorecards/:id/edit" element={<EditScorecard />} />
          <Route path="/import/excel" element={<ImportPage />} />
        </Route>
      </Route>

      {/* Rute fallback untuk halaman yang tidak ditemukan */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
