import { useAuth } from '../../context/AuthProvider';
    import styles from './Header.module.scss';

    const Header = () => {
      const { user, logout } = useAuth();

      return (
        <header className={styles.header}>
          <div className={styles.header__title}>
            {/* Judul halaman bisa dibuat dinamis nanti */}
            <h2>Dashboard</h2>
          </div>
          <div className={styles.header__user}>
            <span>Welcome, {user?.name}</span>
            <button onClick={logout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
        </header>
      );
    };

    export default Header;