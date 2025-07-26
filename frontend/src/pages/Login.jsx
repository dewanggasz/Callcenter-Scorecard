    import { useState } from 'react';
    import { useAuth } from '../context/AuthProvider'; // Impor custom hook kita
    import styles from './Login.module.scss';
    
    const Login = () => {
      const [email, setEmail] = useState('spv@example.com'); // Default untuk kemudahan testing
      const [password, setPassword] = useState('password'); // Default untuk kemudahan testing
      const [error, setError] = useState('');
      
      // Ambil fungsi login dan state loading dari context
      const { login, loading } = useAuth();
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        const loginError = await login(email, password);
    
        if (loginError) {
          setError(loginError);
        }
      };
    
      return (
        <div className={styles.loginContainer}>
          <div className={styles.loginBox}>
            <h2 className={styles.loginBox__title}>Login</h2>
            <p className={styles.loginBox__subtitle}>Access your scorecard dashboard</p>
            
            <form onSubmit={handleSubmit} className={styles.loginForm}>
              <div className={styles.loginForm__group}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.loginForm__group}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {error && <p className={styles.loginForm__error}>{error}</p>}
    
              <button type="submit" className={styles.loginForm__button} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      );
    };
    
    export default Login;
    