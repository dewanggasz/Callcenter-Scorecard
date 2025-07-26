    import { useAuth } from '../context/AuthProvider';
    
    const Dashboard = () => {
      const { user, logout } = useAuth();
    
      return (
        <div>
          <h1>Dashboard</h1>
          {user && (
            <div>
              <p>Welcome, {user.name}!</p>
              <p>Your Role: {user.role.name}</p>
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      );
    };
    
    export default Dashboard;
    