// File: frontend/src/components/layout/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const { user } = useAuth();

  // Tentukan apakah user adalah admin (SPV atau TL) untuk menampilkan menu tertentu
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
          {/* Tampilkan menu-menu berikut hanya jika user adalah admin */}
          {isAdmin && (
            <>
              <li>
                <NavLink 
                  to="/scorecards" 
                  end // 'end' prop penting agar tidak aktif saat di /scorecards/create
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
              <li>
                <NavLink 
                  to="/import/excel" 
                  className={({ isActive }) => isActive ? styles.active : ''}
                >
                  Impor dari Excel
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
