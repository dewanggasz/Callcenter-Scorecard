    import { Navigate, Outlet } from 'react-router-dom';
    import { useAuth } from '../context/AuthProvider';
    
    const ProtectedRoute = () => {
      const { user, loading } = useAuth();
    
      // Selama loading, jangan render apapun
      if (loading) {
        return <div>Loading...</div>; // Atau tampilkan spinner
      }
    
      // Jika sudah tidak loading dan tidak ada user, arahkan ke login
      if (!user) {
        return <Navigate to="/login" />;
      }
    
      // Jika ada user, tampilkan halaman yang diminta
      return <Outlet />;
    };
    
    export default ProtectedRoute;
    