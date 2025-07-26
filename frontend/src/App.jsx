    import { Routes, Route, Navigate } from 'react-router-dom';
    import { useAuth } from './context/AuthProvider';
    
    import Login from './pages/Login';
    import Dashboard from './pages/Dashboard';
    import ProtectedRoute from './components/ProtectedRoute';
    
    function App() {
      const { user, loading } = useAuth();
    
      if (loading) {
        return <div>Application Loading...</div>; // Tampilan loading utama
      }
    
      return (
        <Routes>
          {/* Rute utama, jika sudah login, arahkan ke dashboard, jika belum, ke login */}
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          
          {/* Rute publik */}
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          
          {/* Rute yang dilindungi */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Tambahkan rute terlindungi lainnya di sini */}
          </Route>
    
          {/* Rute untuk halaman tidak ditemukan */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      );
    }
    
    export default App;
    