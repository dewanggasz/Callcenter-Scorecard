// File: frontend/src/components/layout/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider'; // Impor useAuth
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const { user } = useAuth(); // Dapatkan data user yang sedang login

  // Tentukan apakah user adalah admin (SPV atau TL)
  const isAdmin = user && (user.role.name === 'SPV' || user.role.name === 'TL');

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__logo}>
        <h2>Scorecard</h2>
      </div>
      <nav className={styles.sidebar__nav}>
        <ul>
          <li>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => isActive ? styles.active : ''}
            >
              Dasbor
            </NavLink>
          </li>
          {/* Hanya tampilkan menu ini jika user adalah SPV atau TL */}
          {isAdmin && (
            <>
              <li>
                <NavLink 
                  to="/scorecards" 
                  end
                  className={({ isActive }) => isActive ? styles.active : ''}
                >
                  Daftar Scorecard
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/scorecards/create" 
                  className={({ isActive }) => isActive ? styles.active : ''}
                >
                  Buat Scorecard
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
