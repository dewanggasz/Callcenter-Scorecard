import { useState } from 'react';
    import apiClient from '../services/api'; // Impor instance Axios kita
    import styles from './Login.module.scss'; // Impor SCSS module
    
    const Login = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
      const [loading, setLoading] = useState(false);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try {
          // Kirim request ke endpoint /login di backend
          const response = await apiClient.post('/login', {
            email,
            password,
          });
          
          // Jika berhasil, simpan token dan data user
          console.log('Login successful:', response.data);
          localStorage.setItem('auth_token', response.data.access_token);
          
          // Nanti kita akan redirect user ke dashboard
          
        } catch (err) {
          console.error('Login failed:', err);
          setError('Login failed. Please check your email and password.');
        } finally {
          setLoading(false);
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